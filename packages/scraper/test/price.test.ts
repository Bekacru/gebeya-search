import { describe, expect, test } from "vitest";

import { getPrice } from "../src/utils/get-price";

describe("test-price", () => {
    test("1", () => {
        const caption = `✅የጡንቻን እድገት የሚያፋጥን 
        ✅የሰውነት ብቃትና ክብደት ለመጨመር የሚረዳ                    
        ✅FDA Approved
        ✅WADA (World Anti-Doping Agency) certified
        ✅Halaal Certified
        🇺🇸 USA Brand        💵2kg - 4800 ብር                                                                                                                                                                    
        🚖Free Delivery     
        📦ከአዲስ አበባ ውጪ ለምትገኙ ደንበኞቻችን በፈጣን ፖሰታ/ባስ እንልካለን                                                                                                                                                                📞0953684386
        📥 @moosmart29
        👉Join @moosmarts12'''), 4800)
        `;

        const price = getPrice(caption);
        console.log(price);
        expect(price).toBe(4800);
    });
    test("2", () => {
        const caption = `Apple 12.9" iPad Pro 5th gen
        M1 Chip (Mid 2021)
        512GB
        Wi-Fi + Silver
        Silver
        Mint Condition 

        💰  98,000
        📱 0911219241
        `;

        const price = getPrice(caption);
        console.log(price);
        expect(price).toBe(98000);
    });
    test("2", () => {
        const caption = `
        ✅ New

        💰 𝐏𝐫𝐢𝐜𝐞: 1700 ብር

        💰 𝐏𝐫𝐢𝐜𝐞: 1700 ብር
        Size : ከ 40 ቁጥር ጀምሮ 
        አድራሻ. 4 ኪሎ ቱሪስት ሆቴል ወረድ
        ብሎ በሚገኘው ፖስታ ቤት አጠገብ 
        የሚገኘው አዲስ ብርሀን የገበያ ማዕከል
        ውስጥ ግራውንድ ሱቅ ቁ.006
        Make your order 👇 
        📱telegram @Sahite_shopping
        ☎️phone       0902966670

        👇👇👇ተጨማሪ እቃዎችን ለማየት ቻናላችንን ይቀላቀሉ👇👇👇👇👇
        https://t.me/sahiteshopping
        https://t.me/sahiteshopping
        👆👆👆👆👆👆👆👆👆👆👆

        💵  BIRR

        📱 0902966670 |
        @

        #NEW

        From: @ethio_market_place_bot
        `;

        const price = getPrice(caption);
        console.log(price);
        expect(price).toBe(98000);
    });
});
