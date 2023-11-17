//work in progress
export function getPrice(caption: string): number | null {
    const text = caption.toLowerCase().replace("ብር", "birr");
    const priceMatch = text.match(/(\d+([.,]\d{1,4})?)\s*birr/);
    if (priceMatch) {
        const priceString = priceMatch[1];
        const price = parseFloat(priceString.replace(",", ""));
        return price;
    }

    const priceMatch2 = text.match(/💰\s*(\d+([.,]\d{1,4})?)/);
    if (priceMatch2) {
        const priceString = priceMatch2[1];
        const price = parseFloat(priceString.replace(",", ""));
        return price;
    }

    return null;
}
