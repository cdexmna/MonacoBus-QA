import { test, expect, chromium } from '@playwright/test';
import { v4 as uuidv4 } from 'uuid';
import {loginDI, createBooking, deleteBooking, deleteEvent, inviteBooking, inviteBusiness, createNotifyEvent, acceptBooking, rejectBooking, standbyBooking, addCourse, removeCourse, blastGroup, removeBlastGroup, blastAll, blastDancers, sendMessage} from '../../../helper/DI/functions.js';
import {loginCS} from '../../../helper/CS/functions.js';
import {DimiDI} from '../../../credentials-DI.json';
import {DimiCS} from '../../../credentials-CS.json';
const fs = require("fs");
const LoginScreenDI = require('../../../screenObjects/English/DI/login.screen.js');

const HomeScreenDI = require('../../../screenObjects/English/DI/home.screen.js');

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

    test.describe('Home Page', (page) => {

        test.describe('Check UI elements on home page', async (page) => {
            const homeScreenDI = new HomeScreenDI(page, lang);
            test('Language dropbox', async ({page}) => {
                const homeScreenDI = new HomeScreenDI(page, lang);
                await expect (homeScreenDI.drpLanguage).toBeVisible({timeout:30000});
                await expect (homeScreenDI.drpLanguage).toHaveValue(lang);
            });
            test('Logo', async ({page}) => {
                const homeScreenDI = new HomeScreenDI(page, lang);
                await homeScreenDI.linkLogo.click();
                await expect (homeScreenDI.linkLogout).toBeVisible();
                await expect (page.getByText(testUserDI.name)).toBeVisible();
                await expect (page.getByText(testUserDI.role)).toBeVisible();
            });
            test('Heading buttons', async ({page}) => {
                const homeScreenDI = new HomeScreenDI(page, lang);
                await expect(homeScreenDI.linkReadVoucher).toBeVisible();
                await expect(homeScreenDI.btnBus).toBeVisible();
                await expect(homeScreenDI.btnFavs).toBeVisible();
                await expect(homeScreenDI.btnMonacoLGT).toBeVisible();
                await expect(homeScreenDI.btnVouchers).toBeVisible();
            });
        });        
    });
});

