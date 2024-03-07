import {
    IIncartGift,
    SelectedGiftOptionType,
    StockInfoType,
} from '@Types/types';

export const stockFinder = (
    stockInfos: StockInfoType[],
    targetOptions?: SelectedGiftOptionType[],
) => {
    // 특정 옵션에 대한 재고 + 옵션 있는 상품
    if (targetOptions && targetOptions.length > 0) {
        let targetStockInfo = stockInfos.find((info, i) =>
            info.options.every((stockOption, j) => {
                let sameOptionName: boolean = false;
                let sameOptionDetail: boolean = false;

                let targetOption = targetOptions.find(
                    (option, j) =>
                        option.option_name === stockOption.option_name,
                );
                if (targetOption != (null || undefined)) {
                    sameOptionName = true;
                    sameOptionDetail =
                        targetOption.option_detail.option_value ===
                            stockOption.option_detail.option_value &&
                        targetOption.option_detail.option_price ===
                            stockOption.option_detail.option_price;
                }

                return sameOptionName && sameOptionDetail;
            }),
        );
        if (targetStockInfo != (null || undefined)) {
            return targetStockInfo.amount;
        } else {
            // error
            return -1;
        }
    } else {
        // 상품 전체에 대한 재고 + 옵션 없는 상품
        let allStocksAmount = 0;
        stockInfos.forEach((info, i) => {
            allStocksAmount += info.amount;
        });
        return allStocksAmount;
    }
};
