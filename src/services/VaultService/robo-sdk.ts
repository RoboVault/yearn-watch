import { ethers } from 'ethers';
import { VaultApi, StrategyApi, VaultVersion } from '../../types';
import { StrategyReport } from '../../utils';
import MockStrategyReport from './mock-strategy-report.json';

const BaseStrategyAbi =
    '[{"inputs":[{"internalType":"address","name":"_vault","type":"address"},{"components":[{"internalType":"address","name":"pool","type":"address"},{"internalType":"uint256","name":"alloc","type":"uint256"}],"internalType":"structStrategy.PoolAlloc[]","name":"_alloc","type":"tuple[]"}],"stateMutability":"nonpayable","type":"constructor","name":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"clone","type":"address"}],"name":"Cloned","type":"event"},{"anonymous":false,"inputs":[],"name":"EmergencyExitEnabled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"profit","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"loss","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"debtPayment","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"debtOutstanding","type":"uint256"}],"name":"Harvested","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"debtThreshold","type":"uint256"}],"name":"UpdatedDebtThreshold","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newKeeper","type":"address"}],"name":"UpdatedKeeper","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"delay","type":"uint256"}],"name":"UpdatedMaxReportDelay","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"metadataURI","type":"string"}],"name":"UpdatedMetadataURI","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"delay","type":"uint256"}],"name":"UpdatedMinReportDelay","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"profitFactor","type":"uint256"}],"name":"UpdatedProfitFactor","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"rewards","type":"address"}],"name":"UpdatedRewards","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newStrategist","type":"address"}],"name":"UpdatedStrategist","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"alloc","outputs":[{"internalType":"address","name":"pool","type":"address"},{"internalType":"uint256","name":"alloc","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"apiVersion","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"_pool","type":"address"},{"internalType":"uint256","name":"_bBal","type":"uint256"}],"name":"bTokenToWant","outputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balanceOfStake","outputs":[{"internalType":"uint256","name":"total","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balanceOfWant","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"pool","type":"address"},{"internalType":"uint256","name":"alloc","type":"uint256"}],"internalType":"structStrategy.PoolAlloc[]","name":"_newAlloc","type":"tuple[]"}],"name":"changeAllocs","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_vault","type":"address"},{"internalType":"address","name":"_strategist","type":"address"},{"internalType":"address","name":"_rewards","type":"address"},{"internalType":"address","name":"_keeper","type":"address"},{"components":[{"internalType":"address","name":"pool","type":"address"},{"internalType":"uint256","name":"alloc","type":"uint256"}],"internalType":"structStrategy.PoolAlloc[]","name":"_alloc","type":"tuple[]"}],"name":"cloneStrategy","outputs":[{"internalType":"address","name":"newStrategy","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_vault","type":"address"},{"components":[{"internalType":"address","name":"pool","type":"address"},{"internalType":"uint256","name":"alloc","type":"uint256"}],"internalType":"structStrategy.PoolAlloc[]","name":"_alloc","type":"tuple[]"}],"name":"cloneStrategy","outputs":[{"internalType":"address","name":"newStrategy","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"debtThreshold","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"delegatedAssets","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"emergencyExit","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"estimatedTotalAssets","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amtInWei","type":"uint256"}],"name":"ethToWant","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"callCostInWei","type":"uint256"}],"name":"harvestTrigger","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_vault","type":"address"},{"internalType":"address","name":"_strategist","type":"address"},{"internalType":"address","name":"_rewards","type":"address"},{"internalType":"address","name":"_keeper","type":"address"},{"components":[{"internalType":"address","name":"pool","type":"address"},{"internalType":"uint256","name":"alloc","type":"uint256"}],"internalType":"structStrategy.PoolAlloc[]","name":"_alloc","type":"tuple[]"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"keeper","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxReportDelay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"metadataURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_newStrategy","type":"address"}],"name":"migrate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"minCredit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minProfit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minReportDelay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pendingInterest","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"profitFactor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewards","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_debtThreshold","type":"uint256"}],"name":"setDebtThreshold","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"setEmergencyExit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_keeper","type":"address"}],"name":"setKeeper","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_delay","type":"uint256"}],"name":"setMaxReportDelay","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_metadataURI","type":"string"}],"name":"setMetadataURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_delay","type":"uint256"}],"name":"setMinReportDelay","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_profitFactor","type":"uint256"}],"name":"setProfitFactor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_rewards","type":"address"}],"name":"setRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_strategist","type":"address"}],"name":"setStrategist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"strategist","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"sweep","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"tend","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"callCostInWei","type":"uint256"}],"name":"tendTrigger","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_minCredit","type":"uint256"}],"name":"updateMinCredit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_minProfit","type":"uint256"}],"name":"updateMinProfit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"vault","outputs":[{"internalType":"contractVaultAPI","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"want","outputs":[{"internalType":"contractIERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amountNeeded","type":"uint256"}],"name":"withdraw","outputs":[{"internalType":"uint256","name":"_loss","type":"uint256"}],"stateMutability":"nonpayable","type":"function"}]';
const RoboVaultAbiV3 =
    '[{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"},{"indexed":true,"name":"receiver","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"strategy","type":"address"},{"indexed":false,"name":"debtRatio","type":"uint256"},{"indexed":false,"name":"minDebtPerHarvest","type":"uint256"},{"indexed":false,"name":"maxDebtPerHarvest","type":"uint256"},{"indexed":false,"name":"performanceFee","type":"uint256"}],"name":"StrategyAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"strategy","type":"address"},{"indexed":false,"name":"gain","type":"uint256"},{"indexed":false,"name":"loss","type":"uint256"},{"indexed":false,"name":"debtPaid","type":"uint256"},{"indexed":false,"name":"totalGain","type":"uint256"},{"indexed":false,"name":"totalLoss","type":"uint256"},{"indexed":false,"name":"totalDebt","type":"uint256"},{"indexed":false,"name":"debtAdded","type":"uint256"},{"indexed":false,"name":"debtRatio","type":"uint256"}],"name":"StrategyReported","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"governance","type":"address"}],"name":"UpdateGovernance","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"governance","type":"address"}],"name":"NewPendingGovernance","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"management","type":"address"}],"name":"UpdateManagement","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"rewards","type":"address"}],"name":"UpdateRewards","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"depositLimit","type":"uint256"}],"name":"UpdateDepositLimit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"performanceFee","type":"uint256"}],"name":"UpdatePerformanceFee","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"managementFee","type":"uint256"}],"name":"UpdateManagementFee","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"guardian","type":"address"}],"name":"UpdateGuardian","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"active","type":"bool"}],"name":"EmergencyShutdown","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"queue","type":"address[20]"}],"name":"UpdateWithdrawalQueue","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"strategy","type":"address"},{"indexed":false,"name":"debtRatio","type":"uint256"}],"name":"StrategyUpdateDebtRatio","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"strategy","type":"address"},{"indexed":false,"name":"minDebtPerHarvest","type":"uint256"}],"name":"StrategyUpdateMinDebtPerHarvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"strategy","type":"address"},{"indexed":false,"name":"maxDebtPerHarvest","type":"uint256"}],"name":"StrategyUpdateMaxDebtPerHarvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"strategy","type":"address"},{"indexed":false,"name":"performanceFee","type":"uint256"}],"name":"StrategyUpdatePerformanceFee","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"oldVersion","type":"address"},{"indexed":true,"name":"newVersion","type":"address"}],"name":"StrategyMigrated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"strategy","type":"address"}],"name":"StrategyRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"strategy","type":"address"}],"name":"StrategyRemovedFromQueue","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"strategy","type":"address"}],"name":"StrategyAddedToQueue","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"healthCheck","type":"address"}],"name":"UpdateHealthCheck","type":"event"},{"inputs":[{"name":"token","type":"address"},{"name":"governance","type":"address"},{"name":"rewards","type":"address"},{"name":"nameOverride","type":"string"},{"name":"symbolOverride","type":"string"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"token","type":"address"},{"name":"governance","type":"address"},{"name":"rewards","type":"address"},{"name":"nameOverride","type":"string"},{"name":"symbolOverride","type":"string"},{"name":"guardian","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"token","type":"address"},{"name":"governance","type":"address"},{"name":"rewards","type":"address"},{"name":"nameOverride","type":"string"},{"name":"symbolOverride","type":"string"},{"name":"guardian","type":"address"},{"name":"management","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"token","type":"address"},{"name":"governance","type":"address"},{"name":"rewards","type":"address"},{"name":"nameOverride","type":"string"},{"name":"symbolOverride","type":"string"},{"name":"guardian","type":"address"},{"name":"management","type":"address"},{"name":"healthCheck","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"gas":4546,"inputs":[],"name":"apiVersion","outputs":[{"name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"gas":106972,"inputs":[{"name":"name","type":"string"}],"name":"setName","outputs":[],"stateMutability":"nonpayable","type":"function"},{"gas":71822,"inputs":[{"name":"symbol","type":"string"}],"name":"setSymbol","outputs":[],"stateMutability":"nonpayable","type":"function"},{"gas":38261,"inputs":[{"name":"governance","type":"address"}],"name":"setGovernance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"gas":38187,"inputs":[],"name":"acceptGovernance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"gas":38325,"inputs":[{"name":"management","type":"address"}],"name":"setManagement","outputs":[],"stateMutability":"nonpayable","type":"function"},{"gas":38876,"inputs":[{"name":"rewards","type":"address"}],"name":"setRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"gas":36489,"inputs":[{"name":"degradation","type":"uint256"}],"name":"setLockedProfitDegradation","outputs":[],"stateMutability":"nonpayable","type":"function"},{"gas":38315,"inputs":[{"name":"limit","type":"uint256"}],"name":"setDepositLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"gas":38449,"inputs":[{"name":"fee","type":"uint256"}],"name":"setPerformanceFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"gas":38479,"inputs":[{"name":"fee","type":"uint256"}],"name":"setManagementFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"gas":39723,"inputs":[{"name":"guardian","type":"address"}],"name":"setGuardian","outputs":[],"stateMutability":"nonpayable","type":"function"},{"gas":39794,"inputs":[{"name":"active","type":"bool"}],"name":"setEmergencyShutdown","outputs":[],"stateMutability":"nonpayable","type":"function"},{"gas":1259287,"inputs":[{"name":"queue","type":"address[20]"}],"name":"setWithdrawalQueue","outputs":[],"stateMutability":"nonpayable","type":"function"},{"gas":77948,"inputs":[{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"gas":119011,"inputs":[{"name":"sender","type":"address"},{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"gas":39541,"inputs":[{"name":"spender","type":"address"},{"name":"amount","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"gas":41582,"inputs":[{"name":"spender","type":"address"},{"name":"amount","type":"uint256"}],"name":"increaseAllowance","outputs":[{"name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"gas":41606,"inputs":[{"name":"spender","type":"address"},{"name":"amount","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"gas":83428,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"},{"name":"amount","type":"uint256"},{"name":"expiry","type":"uint256"},{"name":"signature","type":"bytes"}],"name":"permit","outputs":[{"name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"gas":4698,"inputs":[],"name":"totalAssets","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deposit","outputs":[{"name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_amount","type":"uint256"}],"name":"deposit","outputs":[{"name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_amount","type":"uint256"},{"name":"recipient","type":"address"}],"name":"deposit","outputs":[{"name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"gas":828175,"inputs":[],"name":"maxAvailableShares","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[{"name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"maxShares","type":"uint256"}],"name":"withdraw","outputs":[{"name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"maxShares","type":"uint256"},{"name":"recipient","type":"address"}],"name":"withdraw","outputs":[{"name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"maxShares","type":"uint256"},{"name":"recipient","type":"address"},{"name":"maxLoss","type":"uint256"}],"name":"withdraw","outputs":[{"name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"gas":40934,"inputs":[],"name":"pricePerShare","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"name":"strategy","type":"address"},{"name":"debtRatio","type":"uint256"},{"name":"minDebtPerHarvest","type":"uint256"},{"name":"maxDebtPerHarvest","type":"uint256"},{"name":"performanceFee","type":"uint256"}],"name":"addStrategy","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"strategy","type":"address"},{"name":"debtRatio","type":"uint256"},{"name":"minDebtPerHarvest","type":"uint256"},{"name":"maxDebtPerHarvest","type":"uint256"},{"name":"performanceFee","type":"uint256"},{"name":"profitLimitRatio","type":"uint256"}],"name":"addStrategy","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"strategy","type":"address"},{"name":"debtRatio","type":"uint256"},{"name":"minDebtPerHarvest","type":"uint256"},{"name":"maxDebtPerHarvest","type":"uint256"},{"name":"performanceFee","type":"uint256"},{"name":"profitLimitRatio","type":"uint256"},{"name":"lossLimitRatio","type":"uint256"}],"name":"addStrategy","outputs":[],"stateMutability":"nonpayable","type":"function"},{"gas":115872,"inputs":[{"name":"strategy","type":"address"},{"name":"debtRatio","type":"uint256"}],"name":"updateStrategyDebtRatio","outputs":[],"stateMutability":"nonpayable","type":"function"},{"gas":43120,"inputs":[{"name":"strategy","type":"address"},{"name":"minDebtPerHarvest","type":"uint256"}],"name":"updateStrategyMinDebtPerHarvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"gas":43150,"inputs":[{"name":"strategy","type":"address"},{"name":"maxDebtPerHarvest","type":"uint256"}],"name":"updateStrategyMaxDebtPerHarvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"gas":41035,"inputs":[{"name":"strategy","type":"address"},{"name":"performanceFee","type":"uint256"}],"name":"updateStrategyPerformanceFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"gas":40721,"inputs":[{"name":"_healthCheck","type":"address"}],"name":"setHealthCheck","outputs":[],"stateMutability":"nonpayable","type":"function"},{"gas":1140513,"inputs":[{"name":"oldVersion","type":"address"},{"name":"newVersion","type":"address"}],"name":"migrateStrategy","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"revokeStrategy","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"strategy","type":"address"}],"name":"revokeStrategy","outputs":[],"stateMutability":"nonpayable","type":"function"},{"gas":1195529,"inputs":[{"name":"strategy","type":"address"}],"name":"addStrategyToQueue","outputs":[],"stateMutability":"nonpayable","type":"function"},{"gas":23032443,"inputs":[{"name":"strategy","type":"address"}],"name":"removeStrategyFromQueue","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"debtOutstanding","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"name":"strategy","type":"address"}],"name":"debtOutstanding","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"creditAvailable","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"name":"strategy","type":"address"}],"name":"creditAvailable","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"gas":10811,"inputs":[],"name":"availableDepositLimit","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"expectedReturn","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"name":"strategy","type":"address"}],"name":"expectedReturn","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"gas":1098145,"inputs":[{"name":"gain","type":"uint256"},{"name":"loss","type":"uint256"},{"name":"_debtPayment","type":"uint256"}],"name":"report","outputs":[{"name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"token","type":"address"}],"name":"sweep","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"token","type":"address"},{"name":"amount","type":"uint256"}],"name":"sweep","outputs":[],"stateMutability":"nonpayable","type":"function"},{"gas":8678,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"stateMutability":"view","type":"function"},{"gas":7731,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"stateMutability":"view","type":"function"},{"gas":2408,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"gas":2653,"inputs":[{"name":"arg0","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"gas":2898,"inputs":[{"name":"arg0","type":"address"},{"name":"arg1","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"gas":2498,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"gas":2528,"inputs":[],"name":"token","outputs":[{"name":"","type":"address"}],"stateMutability":"view","type":"function"},{"gas":2558,"inputs":[],"name":"governance","outputs":[{"name":"","type":"address"}],"stateMutability":"view","type":"function"},{"gas":2588,"inputs":[],"name":"management","outputs":[{"name":"","type":"address"}],"stateMutability":"view","type":"function"},{"gas":2618,"inputs":[],"name":"guardian","outputs":[{"name":"","type":"address"}],"stateMutability":"view","type":"function"},{"gas":2648,"inputs":[],"name":"healthCheck","outputs":[{"name":"","type":"address"}],"stateMutability":"view","type":"function"},{"gas":10353,"inputs":[{"name":"arg0","type":"address"}],"name":"strategies","outputs":[{"name":"performanceFee","type":"uint256"},{"name":"activation","type":"uint256"},{"name":"debtRatio","type":"uint256"},{"name":"minDebtPerHarvest","type":"uint256"},{"name":"maxDebtPerHarvest","type":"uint256"},{"name":"lastReport","type":"uint256"},{"name":"totalDebt","type":"uint256"},{"name":"totalGain","type":"uint256"},{"name":"totalLoss","type":"uint256"}],"stateMutability":"view","type":"function"},{"gas":2753,"inputs":[{"name":"arg0","type":"uint256"}],"name":"withdrawalQueue","outputs":[{"name":"","type":"address"}],"stateMutability":"view","type":"function"},{"gas":2738,"inputs":[],"name":"emergencyShutdown","outputs":[{"name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"gas":2768,"inputs":[],"name":"depositLimit","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"gas":2798,"inputs":[],"name":"debtRatio","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"gas":2828,"inputs":[],"name":"totalDebt","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"gas":2858,"inputs":[],"name":"lastReport","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"gas":2888,"inputs":[],"name":"activation","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"gas":2918,"inputs":[],"name":"lockedProfit","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"gas":2948,"inputs":[],"name":"lockedProfitDegradation","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"gas":2978,"inputs":[],"name":"rewards","outputs":[{"name":"","type":"address"}],"stateMutability":"view","type":"function"},{"gas":3008,"inputs":[],"name":"managementFee","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"gas":3038,"inputs":[],"name":"performanceFee","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"gas":3283,"inputs":[{"name":"arg0","type":"address"}],"name":"nonces","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"gas":3098,"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"name":"","type":"bytes32"}],"stateMutability":"view","type":"function"}]';

type VaultInfo = {
    address: string;
    strategies: string[];
};

export const RoboVaults: VaultInfo[] = [
    {
        // Robovault V3 USDC
        address: '0x1B6ecdA7Fd559793c0Def1F1D90A2Df4887B9718',
        strategies: [
            '0xF890a7EB74E4859b74a4a3bb847eF9ff25a46b38',
            '0x003b3D617868625c81455b4BC6741ec8642cb90E',
        ],
    },
    {
        // Robovault V3 USDC (B)
        address: '0xa9BE8Ea19aAC1966fd4a7dCc418d07E0b1716d8C',
        strategies: [
            '0x9F0AF2948d4CF3791357B71AEA56C5Da9f743241',
            '0x7fa63318D55728a23a095c8C1aD0D840cbd7C4D5',
        ],
    },
    {
        // Robovault V3 USDC (C)
        address: '0x4d7AE4073657203702258Fd8A6369Fae3D718bD9',
        strategies: [
            '0x1640b34CAB005225c2608A274f3A3D459624f3Fd',
            '0x7f88D09834134845Fc7A61B449eDb34BB1367664',
        ],
    },
    {
        // Robovault V3 MIM
        address: '0x92D2DdF8eed6f2bdB9a7890a00B07a48C9c7A658',
        strategies: [
            '0x0Ed79d21205cd7887C2189e7736A59f0c8B80816',
            '0x5F18544fe7652cf13bA3E7ef2B3470FDf2C31D2F',
        ],
    },
    {
        // Robovault V3 WFTM
        address: '0x38Da23Ef41333bE0d309Cd63166035FF3b7E2000',
        strategies: [
            '0x0F8fd0B8639A19366B255ebde7A87a1cd435e037',
            '0xfa116AB2137c81811B0198d59a51BD7c1c32659C',
            '0xC88BfFf86D40b5c1769fb8625986403173045a92',
        ],
    },
    {
        // Robovault V3 WFTM (B)
        address: '0xE94Df1Ea87515Dcb5548aB04Ec12FD4C0966064d',
        strategies: ['0x0Da3A6ca0FBC9375B2F2e47fA53faF62C3c4a945'],
    },
    {
        // Robovault V3 WFTM (C)
        address: '0x033310d982cB70B63cE3D8AcAbCad6aF5e2a575C',
        strategies: ['0x43f2e1C0C974Ac633d4FD944B4313e945172E2FA'],
    },
    {
        // Robovault V3 WBTC
        address: '0x13994411Eda808B354F62db5490B344F431499ae',
        strategies: [
            '0x6c37A475e6EBfF4d128AF46266d1b9024cF25fdE',
            '0xeEA3D06670a4cd8DB5afF75014Cb6B570C8e47EB',
        ],
    },
    {
        // Robovault V3 WETH
        address: '0x81F0f4fDF5148f09aAE811b5995D94F703ED0963',
        strategies: [
            '0xB7870E85f033E7e5C3A340F1A6d858De62386eef',
            '0x872d92EC26aD64A78a8Ed41CDc15A9feFc0185Ac',
        ],
    },
    {
        // Robovault V3 DAI
        address: '0xd10112521e860bdE82FD34f88113052e434930C4',
        strategies: [
            '0xBCb66e4C2D36bC1909C5B46f18D07990460cf1EF',
            '0x725b170cE7929f06Dfdf6Bd85523CB0837dE23bF',
        ],
    },
];

/**
 * TODO:
 *  - Pull basic strategy list dynamically instead of hardcoding (getStrategiesForVault)
 *  - Replace Yearn API types for custom types.
 *    - Create a mapping class to convert to the API type outside of this class (i.e VaultAPI, StrategyAPI)
 *  - Implement getStrategyPerformanceReport with SubGraph
 *  - Implement getStrategyDescription with SubGraph or RPC
 *  - Encapsulate the multicall RPC code into this class (see vaultDataMapping.ts)
 */
export class RoboSdk {
    constructor(private readonly provider: ethers.providers.JsonRpcProvider) {}

    public async getVaults(): Promise<VaultApi[]> {
        const vaultPromises = RoboVaults.map((vaultInfo) =>
            this.getVault(vaultInfo)
        );
        return Promise.all(vaultPromises);
    }

    public async getVault(vaultInfo: VaultInfo): Promise<VaultApi> {
        const vaultContract = this.getVaultContract(vaultInfo.address);
        const apiVersion = await vaultContract.apiVersion();
        const name = await vaultContract.name();
        const symbol = await vaultContract.symbol();
        const decimals = parseInt(await vaultContract.decimals());
        const tokenAddress = await vaultContract.token();
        const emergencyShutdown = await vaultContract.emergencyShutdown();
        const managementFee = parseInt(await vaultContract.managementFee());
        const performanceFee = parseInt(await vaultContract.performanceFee());
        const strategies = await this.getStrategiesForVault(vaultInfo);

        const vault: VaultApi = {
            address: vaultInfo.address,
            apiVersion: apiVersion,
            decimals: decimals,
            endorsed: true,
            icon: undefined, // TODO droidmuncher: Not sure where to get the icon from
            symbol: symbol,
            name: name,
            want: tokenAddress, // TODO droidmuncher: Is this correct?
            token: {
                // TODO: droidmuncher: I think these token fields are same as the above fields
                address: tokenAddress,
                decimals: decimals,
                symbol: symbol,
                icon: undefined, // TODO droidmuncher: Not sure where to get the icon from
                name: name,
            },
            type: VaultVersion.V2,
            emergencyShutdown: emergencyShutdown,
            fees: {
                general: {
                    managementFee: managementFee,
                    performanceFee: performanceFee,
                },
            },
            tvl: { totalAssets: 0 }, // TODO: droidmuncher: Figure this out
            strategies: strategies,
        };

        return vault;
    }

    /**
     * TODO: droidmuncher: Not yet implemented... Can we get this using RPC calls?
     */
    public async getStrategyDescription(
        strategyAddress: string
    ): Promise<string> {
        const fakeDescription = `Description for ${strategyAddress} coming soon`;
        return new Promise((resolve) => resolve(fakeDescription));
    }

    /**
     * TODO: droidmuncher: Replace mock data with SubGraph implemenation
     */
    public async getStrategyReport(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        strategyAddress: string
    ): Promise<StrategyReport[]> {
        const reports: StrategyReport[] = MockStrategyReport.map(
            (mockReport) => ({
                debtAdded: mockReport.debtAdded,
                debtLimit: mockReport.debtLimit,
                debtPaid: mockReport.debtPaid,
                profit: mockReport.profit,
                loss: mockReport.loss,
                timestamp: mockReport.timestamp,
                totalDebt: mockReport.totalDebt,
                totalProfit: mockReport.totalProfit,
                totalLoss: mockReport.totalLoss,
                transactionHash: mockReport.transactionHash,
                results: {
                    startTimestamp: mockReport.results.startTimestamp,
                    endTimestamp: mockReport.results.endTimestamp,
                    duration: mockReport.results.duration,
                    apr: mockReport.results.apr,
                    durationPr: mockReport.results.durationPr,
                    currentReport: {
                        id: mockReport.results.currentReport.id,
                        gain: mockReport.results.currentReport.gain,
                        loss: mockReport.results.currentReport.loss,
                        totalDebt: mockReport.results.currentReport.totalDebt,
                        totalGain: mockReport.results.currentReport.totalGain,
                        totalLoss: mockReport.results.currentReport.totalLoss,
                        timestamp: parseInt(
                            mockReport.results.currentReport.timestamp
                        ),
                        transaction: {
                            hash: mockReport.results.currentReport.transaction
                                .hash,
                        },
                    },
                    previousReport: {
                        id: mockReport.results.previousReport.id,
                        gain: mockReport.results.previousReport.gain,
                        loss: mockReport.results.previousReport.loss,
                        totalDebt: mockReport.results.previousReport.totalDebt,
                        totalGain: mockReport.results.previousReport.totalGain,
                        totalLoss: mockReport.results.previousReport.totalLoss,
                        timestamp: parseInt(
                            mockReport.results.previousReport.timestamp
                        ),
                        transaction: {
                            hash: mockReport.results.previousReport.transaction
                                .hash,
                        },
                    },
                },
            })
        );

        return new Promise((resolve) => resolve(reports));
    }

    private async getStrategiesForVault(
        vaultInfo: VaultInfo
    ): Promise<StrategyApi[]> {
        const strategies = [];

        for (const stratAddress of vaultInfo.strategies) {
            const strategyContract = this.getStrategyContract(stratAddress);

            strategies.push({
                address: stratAddress,
                name: await strategyContract.name(),
            });
        }

        return strategies;
    }

    private getVaultContract(vaultAddress: string): ethers.Contract {
        return new ethers.Contract(vaultAddress, RoboVaultAbiV3, this.provider);
    }

    private getStrategyContract(strategyAddress: string): ethers.Contract {
        return new ethers.Contract(
            strategyAddress,
            BaseStrategyAbi,
            this.provider
        );
    }
}
