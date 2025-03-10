import React, { MouseEvent, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { toChecksumAddress } from 'ethereum-checksum-address';

import Hidden from '@material-ui/core/Hidden';
import CallMadeIcon from '@material-ui/icons/CallMade';
import Tooltip from '@material-ui/core/Tooltip';
import { FileCopy } from '@material-ui/icons';
import { Link, Grid } from '@material-ui/core';

import { extractAddress } from '../../../utils/commonUtils';
import getNetworkConfig from '../../../utils/config';
import { Network } from '../../../types';

type EtherScanLinkProps = {
    address?: string;
    transactionHash?: string;
    dark?: boolean | false;
    internalHref?: string;
    network: Network;
};

const StyledFileCopy = styled(FileCopy)`
    && {
        color: ${({ theme }) => theme.text} !important;
    }
`;

const StyledCallMadeIcon = styled(CallMadeIcon)`
    && {
        color: ${({ theme }) => theme.text} !important;
    }
`;

const StyledLink = styled.a`
    && {
        padding: 0;
        padding-left: 16px;
        cursor: pointer;

        :hover {
            filter: brightness(80%);
        }
    }
`;

const StyledAddress = styled.span`
    && {
        color: ${({ theme }) => theme.subtitle} !important;

        text-decoration: none;
        font-weight: 400;
        font-size: 16px;
        font-style: normal;
    }
`;

const StyledCopiedText = styled.span`
    && {
        color: ${({ theme }) => theme.subtitle} !important;
    }
`;

const EtherScanLink = (props: EtherScanLinkProps) => {
    const { address, transactionHash, internalHref, network } = props;
    const [copied, setCopied] = useState(false);
    const networkConfig = getNetworkConfig(network);

    useEffect(() => {
        const timeId = setTimeout(() => {
            setCopied(false);
        }, 1000);

        return () => clearTimeout(timeId);
    }, [copied]);

    let value = '';
    let extractedValue = '';
    if (address) {
        value = toChecksumAddress(address);
        extractedValue = extractAddress(address);
    }
    if (transactionHash) {
        value = transactionHash;
        extractedValue = extractAddress(transactionHash);
    }

    const maskedValue = (
        <Tooltip title={value} aria-label="Etherscan">
            <span>{extractedValue}</span>
        </Tooltip>
    );
    const onCopyToClipboard = (e: MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        navigator.clipboard.writeText(value);
        setCopied(true);
    };
    const refLink = transactionHash
        ? networkConfig.toTxExplorerUrl(value)
        : networkConfig.toAddressExplorerUrl(value);
    return (
        <Grid container spacing={2} alignItems="center">
            <Grid item>
                <StyledAddress>
                    {internalHref ? (
                        <Link
                            component={RouterLink}
                            color="inherit"
                            to={internalHref}
                        >
                            <Hidden smUp>{maskedValue}</Hidden>
                            <Hidden xsDown>{value}</Hidden>
                        </Link>
                    ) : (
                        <>
                            <Hidden smUp>{maskedValue}</Hidden>
                            <Hidden xsDown>{value}</Hidden>
                        </>
                    )}
                </StyledAddress>

                <Tooltip title="Copy to clipboard" aria-label="Clipboard">
                    <StyledLink onClick={(e) => onCopyToClipboard(e)}>
                        <StyledCopiedText>
                            <StyledFileCopy fontSize="inherit" />
                            {copied ? ' Copied' : ''}
                        </StyledCopiedText>
                    </StyledLink>
                </Tooltip>
                <Tooltip title="View on Explorer" aria-label="Explorer">
                    <StyledLink href={refLink} target="_blank">
                        <StyledCallMadeIcon fontSize="inherit" />
                    </StyledLink>
                </Tooltip>
            </Grid>
        </Grid>
    );
};

export default EtherScanLink;
