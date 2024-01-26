/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React from 'react'
import PropTypes from 'prop-types'
import {Skeleton, Text} from '@appspringtechsas/sfcc-geolocated-pricebooks-plugin/app/components/shared/ui'
import {useIntl} from 'react-intl'
import {useCurrency} from '@appspringtechsas/sfcc-geolocated-pricebooks-plugin/app/hooks'
import { formatPrice } from '@appspringtechsas/sfcc-geolocated-pricebooks-plugin/app/utils/product-utils'

const DisplayPrice = ({
    basePrice,
    discountPrice,
    isProductASet = false,
    currency,
    discountPriceProps,
    basePriceProps,
    skeletonProps
}) => {
    const intl = useIntl()
    const {currency: activeCurrency} = useCurrency()
    return (
        <Skeleton isLoaded={currency} display={'flex'} {...skeletonProps}>
            <Text fontWeight="bold" fontSize="md" mr={1}>
                {isProductASet &&
                    `${intl.formatMessage({
                        id: 'product_view.label.starting_at_price',
                        defaultMessage: 'Starting at'
                    })} `}
            </Text>
            {typeof discountPrice === 'number' && (
                <Text as="b" {...discountPriceProps}>
                    {formatPrice(intl, discountPrice, currency, activeCurrency)}
                </Text>
            )}
            <Text
                as={typeof discountPrice === 'number' ? 's' : 'b'}
                ml={typeof discountPrice === 'number' ? 2 : 0}
                fontWeight={discountPrice ? 'normal' : 'bold'}
                {...basePriceProps}
            >
                {formatPrice(intl, basePrice, currency, activeCurrency)}
            </Text>
        </Skeleton>
    )
}

DisplayPrice.propTypes = {
    basePrice: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    discountPrice: PropTypes.number,
    currency: PropTypes.string,
    isProductASet: PropTypes.bool,
    discountPriceProps: PropTypes.object,
    basePriceProps: PropTypes.object,
    skeletonProps: PropTypes.object
}

export default DisplayPrice
