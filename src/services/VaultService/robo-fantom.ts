import { RoboSdk } from './robo-sdk';
import { utils } from 'ethers';
import memoize from 'lodash/memoize';
import { getEthersDefaultProvider } from '../../utils/ethers';
import { mapVaultDataToVault } from '../../utils/vaultDataMapping';
import { sortVaultsByVersion } from './mappings';

import {
    NetworkId,
    Network,
    VaultService,
    Vault,
    VaultApi,
    QueryParam,
    DEFAULT_QUERY_PARAM,
    StrategyMetaData,
} from '../../types';
import { StrategyReport } from '../../utils';

export default class RoboFantomService implements VaultService {
    private readonly roboSdk: RoboSdk;

    constructor() {
        const provider = getEthersDefaultProvider(this.getNetwork());
        this.roboSdk = new RoboSdk(provider);
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

    public async getStrategyMetaData(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        vaultAddress: string,
        strategyAddress: string
    ): Promise<StrategyMetaData> {
        const description = await this.roboSdk.getStrategyDescription(
            strategyAddress
        );
        return { description };
    }

    public async getStrategyReport(
        strategyAddress: string
    ): Promise<StrategyReport[]> {
        return this.roboSdk.getStrategyReport(strategyAddress);
    }

    private async getInnerVaults(): Promise<VaultApi[]> {
        const vaults = await this.roboSdk.getVaults();
        return sortVaultsByVersion([...vaults]);
    }

    private getVaultsMemoized = memoize(this.getInnerVaults);
    private getEndorsedVaultsMemoized = memoize(this.getEndorsedVaults);
}
