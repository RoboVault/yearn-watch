import memoize from 'lodash/memoize';
import { RoboSdk } from '../robo-sdk';
import { Subgraph } from '../subgraph';
import { utils } from 'ethers';
import { getEthersDefaultProvider } from '../../utils/ethers';
import { mapVaultDataToVault } from '../../utils/vaultDataMapping';
import { sortVaultsByVersion } from './mappings';
import getNetworkConfig from '../../utils/config';

import {
    NetworkId,
    Network,
    VaultService,
    Vault,
    VaultApi,
    QueryParam,
    DEFAULT_QUERY_PARAM,
    StrategyMetaData,
    StrategyWithReports,
} from '../../types';

export default class RoboFantomService implements VaultService {
    private readonly roboSdk: RoboSdk;

    constructor() {
        const network = this.getNetwork();
        const provider = getEthersDefaultProvider(network);
        const config = getNetworkConfig(network);
        const subgraph = new Subgraph(config.subgraphUrl);
        this.roboSdk = new RoboSdk(provider, subgraph);
    }

    public getNetwork(): Network {
        return Network.fantom;
    }

    public getNetworkId(): NetworkId {
        return NetworkId.fantom;
    }

    public async getTotalVaults(): Promise<number> {
        const vaults = await this.getVaultsMemoized();
        return vaults.length;
    }

    public getVaultsWithPagination(
        queryParams: QueryParam = DEFAULT_QUERY_PARAM
    ): Promise<Vault[]> {
        return this.getEndorsedVaultsMemoized([], queryParams);
    }

    public async getEndorsedVaults(
        allowList: string[] = [],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        queryParams?: QueryParam
    ): Promise<Vault[]> {
        const rawVaults = await this.getVaultsMemoized();
        const filterList = new Set(allowList.map((addr) => addr.toLowerCase()));
        const filteredVaults = rawVaults.filter(
            (vault) =>
                filterList.size === 0 ||
                filterList.has(vault.address.toLowerCase())
        );

        return mapVaultDataToVault(filteredVaults, this.getNetwork());
    }

    public async getVault(address: string): Promise<Vault> {
        if (!address || !utils.isAddress(address))
            throw new Error('Expected a valid vault address');

        const vaults = await this.getEndorsedVaults([address]);

        const vault = vaults.find(
            (vault) => vault.address.toLowerCase() === address.toLowerCase()
        );

        if (vault === undefined)
            throw new Error('Requested address not recognized as a robo vault');

        return vault;
    }

    /**
     * TODO: droidmuncher: Not yet implemented... Do robo strats have a description?
     */
    public async getStrategyMetaData(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        vaultAddress: string,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        strategyAddress: string
    ): Promise<StrategyMetaData> {
        const emptyMetaData = { description: undefined };
        return new Promise((resolve) => resolve(emptyMetaData));
    }

    public async getStrategyReports(
        strategyAddresses: string[]
    ): Promise<StrategyWithReports[]> {
        return this.roboSdk.getStrategyReports(strategyAddresses);
    }

    private async getInnerVaults(): Promise<VaultApi[]> {
        const vaults = await this.roboSdk.getVaultsWithStrategies();
        const detailedVaults = await this.roboSdk.getDetailedVaults(vaults);
        return sortVaultsByVersion([...detailedVaults]);
    }

    private getVaultsMemoized = memoize(this.getInnerVaults);
    private getEndorsedVaultsMemoized = memoize(this.getEndorsedVaults);
}
