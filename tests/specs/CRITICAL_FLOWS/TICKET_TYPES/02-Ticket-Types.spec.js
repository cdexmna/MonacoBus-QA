import { test, expect, chromium } from '@playwright/test';
import { v4 as uuidv4 } from 'uuid';
import {loginDI, createBooking, deleteBooking, deleteEvent, inviteBooking, inviteBusiness, createNotifyEvent, acceptBooking, rejectBooking, standbyBooking, addCourse, removeCourse, blastGroup, removeBlastGroup, blastAll, blastDancers, sendMessage} from '../../../helper/DI/functions.js';
import {loginCS} from '../../../helper/CS/functions.js';
import {DimiDI} from '../../../credentials-DI.json';
import {DimiCS} from '../../../credentials-CS.json';
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

    test.describe('SCREENS', (page) => {

        test.describe('Check cards on VOUCHER screen', async (page) => {
            test('all cards visible with appropriate prices', async ({page}) => {
                const homeScreenDI = new HomeScreenDI(page, lang);
                const voucherWrapperDI = new VoucherWrapper(page, lang)
                await homeScreenDI.btnVouchers.waitFor({state:"visible"}, {timeout:30000});
                await homeScreenDI.btnVouchers.click();
                await voucherWrapperDI.gyg1DayChild.waitFor({state:"visible"}, {timeout:30000});

                await expect (voucherWrapperDI.gyg1DayChild).toBeVisible();
                await expect (voucherWrapperDI.gyg1DayChild).toContainText(TicketTypes.VOUCHERS.GYG['2 DAYS ADULT'].price);
                await expect (voucherWrapperDI.gyg2DaysAdult).toBeVisible();
                await expect (voucherWrapperDI.gyg2DaysAdult).toContainText(TicketTypes.VOUCHERS.GYG['2 DAYS ADULT'].price);
                await expect (voucherWrapperDI.tiqets1DayChild).toBeVisible();
                await expect (voucherWrapperDI.tiqets1DayChild).toContainText(TicketTypes.VOUCHERS.TIQETS['1 DAY CHILD'].price);
                await expect (voucherWrapperDI.tiqets1DayAdult).toBeVisible();
                await expect (voucherWrapperDI.tiqets1DayAdult).toContainText(TicketTypes.VOUCHERS.TIQETS['1 DAY ADULT'].price);
                await expect (voucherWrapperDI.tiqets2DaysAdult).toBeVisible();
                await expect (voucherWrapperDI.tiqets2DaysAdult).toContainText(TicketTypes.VOUCHERS.TIQETS['2 DAYS ADULT'].price);

                // await expect (page.getByText(TicketTypes.VOUCHERS.GYG['1 DAY CHILD'].price)).toBeVisible();
                
                // await expect (page.getByText(TicketTypes.VOUCHERS.GYG['1 DAY CHILD'].label.price)).toHaveText('0.00€');
            });
        });

        test.describe('Check cards on BUS screen', async (page) => {
            test('all PASS cards visible with appropriate prices', async ({page}) => {
                const homeScreenDI = new HomeScreenDI(page, lang);
                const busWrapperDI = new BusWrapper(page, lang)
                await homeScreenDI.btnBus.waitFor({state:"visible"}, {timeout:30000});
                await homeScreenDI.btnBus.click();
                await busWrapperDI.pass2DaysAdult.waitFor({state:"visible"}, {timeout:30000});

                await expect (busWrapperDI.pass2DaysAdult).toBeVisible();
                await expect (busWrapperDI.pass2DaysAdult).toContainText(TicketTypes.BUS.PASS['2 DAYS ADULT'].price);
                await expect (busWrapperDI.passBusMuseum).toBeVisible();
                await expect (busWrapperDI.passBusMuseum).toContainText(TicketTypes.BUS.PASS['BUS/MUSEUM'].price);
                await expect (busWrapperDI.passBusPalace).toBeVisible();
                await expect (busWrapperDI.passBusPalace).toContainText(TicketTypes.BUS.PASS['BUS+PALACE'].price);
                await expect (busWrapperDI.passTarifPMR).toBeVisible();
                await expect (busWrapperDI.passTarifPMR).toContainText(TicketTypes.BUS.PASS['TARIF PMR'].price);
                await expect (busWrapperDI.passInvites).toBeVisible();
                await expect (busWrapperDI.passInvites).toContainText(TicketTypes.BUS.PASS['INVITES'].price);
            });
            
/* ********************TODO:
    have to make for MONACO LGT types *********************/

            test('all GROUP cards visible with appropriate prices', async ({page}) => {
                const homeScreenDI = new HomeScreenDI(page, lang);
                const busWrapperDI = new BusWrapper(page, lang)
                await homeScreenDI.btnBus.waitFor({state:"visible"}, {timeout:30000});
                await homeScreenDI.btnBus.click();

                await expect (busWrapperDI.group1DayAdult).toBeVisible();
                await expect (busWrapperDI.group1DayAdult).toContainText(TicketTypes.BUS.GROUP['1 DAY ADULT'].price);
                await expect (busWrapperDI.group1DayChild).toBeVisible();
                await expect (busWrapperDI.group1DayChild).toContainText(TicketTypes.BUS.GROUP['1 DAY CHILD'].price);
                await expect (busWrapperDI.group1DaySenior).toBeVisible();
                await expect (busWrapperDI.group1DaySenior).toContainText(TicketTypes.BUS.GROUP['1 DAY SENIOR'].price);
            });

            test('Family pass card visible with appropriate price', async ({page}) => {
                const homeScreenDI = new HomeScreenDI(page, lang);
                const busWrapperDI = new BusWrapper(page, lang)
                await homeScreenDI.btnMonacoLGT.click();

                await expect (busWrapperDI.familyPass).toBeVisible();
                await expect (busWrapperDI.familyPass).toContainText(TicketTypes.BUS['FAMILY'].price);
            });
        });           
    });
});

