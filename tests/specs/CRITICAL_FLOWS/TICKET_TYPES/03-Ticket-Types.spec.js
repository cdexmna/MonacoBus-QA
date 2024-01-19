import { test, expect, chromium } from '@playwright/test';
import { v4 as uuidv4 } from 'uuid';
import {loginDI, createBooking, deleteBooking, deleteEvent, inviteBooking, inviteBusiness, createNotifyEvent, acceptBooking, rejectBooking, standbyBooking, addCourse, removeCourse, blastGroup, removeBlastGroup, blastAll, blastDancers, sendMessage} from '../../../helper/DI/functions.js';
import {loginCS} from '../../../helper/CS/functions.js';
import {DimiDI} from '../../../credentials-DI.json';
import {DimiCS} from '../../../credentials-CS.json';
import BasketWrapper from '../../../screenObjects/English/DI/basket.wrapper.js';
const fs = require("fs");
const LoginScreenDI = require('../../../screenObjects/English/DI/login.screen.js');

const HomeScreenDI = require('../../../screenObjects/English/DI/home.screen.js');
const VoucherWrapper = require('../../../screenObjects/English/DI/voucher.wrapper.js');
const BusWrapper = require('../../../screenObjects/English/DI/bus.wrapper.js');
const TicketTypes = require('../../../screenObjects/English/DI/ticketTypes.json')

const testUserDI = DimiDI;
const testUserCS = DimiCS;
test.setTimeout(180000);

// TODO: This has to be handled with environment variables (check AdmireMe)
const pageURL = 'https://seashell-app-pkyfy.ondigitalocean.app/';
const lang = "en"
const languageFile = JSON.parse(fs.readFileSync("tests/i18n/" + lang + ".json"));
const loginStrings = languageFile.screens.login;
const strings = languageFile.screens.home;

test.describe('Ticket Types', (page) => {

    test.beforeEach(async ({ page }) => {
        const loginScreenDI = new LoginScreenDI(page, lang);
        const homeScreenDI = new HomeScreenDI(page, lang);
        await page.goto(pageURL);
        await loginScreenDI.linkLogo.waitFor({state:"visible"}, {timeout:30000});
        await loginScreenDI.drpLanguage.click();
        await page.selectOption('[name="language"]', lang);

        await loginScreenDI.textUsername.fill(testUserDI.username);
        await loginScreenDI.textPassword.fill(testUserDI.password);
        await loginScreenDI.btnLogin.click();
        await page.waitForTimeout(1000);
        await loginScreenDI.headingSelectYourVehicle.waitFor({state:"visible"}, {timeout:30000});
        await loginScreenDI.drpSelectAVehicle.click();
        await page.selectOption('[name="transport"]', 'Automation Bus -');
        await loginScreenDI.textMileage.fill('1000');
        await loginScreenDI.btnSelect.click();
        // await page.selectOption('[name="language"]', 'en');
    });

    test.describe('BASKET', (page) => {

        test.describe('Check UI elements in basket', async (page) => {
            test('tapping a card adds it to basket and adds UI elements', async ({page}) => {
                const homeScreenDI = new HomeScreenDI(page, lang);
                const voucherWrapperDI = new VoucherWrapper(page, lang);
                const basketWrapperDI = new BasketWrapper(page, lang)
                await homeScreenDI.btnVouchers.click();
                const item1 = TicketTypes.VOUCHERS.GYG['2 DAYS ADULT'].label

                await voucherWrapperDI.gyg2DaysAdult.click();
                // const itemLocatorCode = await basketWrapperDI.itemLocator(TicketTypes.VOUCHERS.GYG['2 DAYS ADULT'].label);
                await expect (await basketWrapperDI.itemLocator(item1)).toBeVisible();
                // await expect (itemLocatorCode).toBeVisible();
                await expect(await basketWrapperDI.btnMinus(item1)).toBeVisible();
                await expect(await basketWrapperDI.btnPlus(item1)).toBeVisible();
                await expect(await basketWrapperDI.iconRemove(item1)).toBeVisible();
                await expect(await basketWrapperDI.textTotal(1)).toBeVisible();
                await expect(await basketWrapperDI.textPriceAmount(TicketTypes.VOUCHERS.GYG['2 DAYS ADULT'].price)).toBeVisible();
                // await expect (page.getByText('0.0 €')).toBeVisible();
                await expect(await basketWrapperDI.btnCheckout).toBeVisible();
                await expect(await basketWrapperDI.btnCheckout).toBeEnabled();
                // const diffRounded = creatorTokensDiff.toFixed(2);
                // expect(diffRounded).toBe(EXPECTED_DIFF_CREATOR);
            });

            test('tapping a Plus or Minus button adds or removes the amount of tickets', async ({page}) => {
                const homeScreenDI = new HomeScreenDI(page, lang);
                const busWrapperDI = new BusWrapper(page, lang);
                const basketWrapperDI = new BasketWrapper(page, lang)
                await homeScreenDI.btnBus.click();
                const item1 = TicketTypes.BUS.PASS['2 DAYS ADULT'].label
                await page.locator(`text= PASS 1J BUS/MUSÉE 32.00 `).locator("..")
                await busWrapperDI.pass2DaysAdult.click();
                await expect(await basketWrapperDI.btnMinus(item1)).toBeVisible();
                // const itemLocatorCode = await basketWrapperDI.itemLocator(TicketTypes.VOUCHERS.GYG['2 DAYS ADULT'].label);
                const btnMinusLocator = await basketWrapperDI.btnMinus(item1);
                await btnMinusLocator.click();
                await expect(await basketWrapperDI.textTotal(0)).not.toBeVisible();

                await page.waitForTimeout(1000);
                await busWrapperDI.pass2DaysAdult.click();
                const btnPlusLocator = await basketWrapperDI.btnPlus(item1);
                await btnPlusLocator.click();
                await expect(await basketWrapperDI.textTotal(2)).toBeVisible();
                await btnMinusLocator.click();
                // await basketWrapperDI.btnMinus(item1).click();
                await expect(await basketWrapperDI.textTotal(1)).toBeVisible();
            });
        });     
    });
});

