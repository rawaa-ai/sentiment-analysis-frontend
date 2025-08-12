export const timeConversion = (data) => {
    if (Array.isArray(data)) {
        return data
            .map(item => {
                const timestamp = new Date(item.date).getTime();
                if (isNaN(timestamp) || item.close == null || isNaN(item.close)) return null;
                return {
                    time: timestamp / 1000,
                    value: Number(item.close),
                    open: Number(item.open),
                    high: Number(item.high),
                    low: Number(item.low),
                };
            })
            .filter(Boolean)
            .sort((a, b) => a.time - b.time);
    } else {
        return data.prediction
            .map(item => {
                const timestamp = new Date(item.date).getTime();
                if (isNaN(timestamp) || item.value == null || isNaN(item.value)) return null;
                return {
                    time: timestamp / 1000,
                    value: Number(item.value),
                };
            })
            .filter(Boolean)
            .sort((a, b) => a.time - b.time);
    }
};