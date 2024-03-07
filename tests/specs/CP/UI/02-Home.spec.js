import { test, expect, chromium } from '@playwright/test';
import { v4 as uuidv4 } from 'uuid';
import {loginCS} from '../../../helper/CS/functions.js';
import {DimiDI} from '../../../credentials-DI.json';
import {DimiCS} from '../../../credentials-CS.json';
import exp from 'constants';
const fs = require("fs");
// import TransportsCP from '../../screenObjects/CP/Transports.screen.js';

const LoginScreenCP = require('../../../screenObjects/CP/login.screen.js');
const LoginScreenDI = require('../../../screenObjects/English/DI/login.screen.js');
const NavigationCP = require('../../../screenObjects/CP/navigation.wrapper.js');
const TransportsCP = require('../../../screenObjects/CP/Transports.screen.js');
const TicketCategoriesCP = require('../../../screenObjects/CP/TicketCategories.screen.js');
const TicketTypesCP = require('../../../screenObjects/CP/TicketTypes.screen.js');
const UsersCP = require('../../../screenObjects/CP/Users.screen.js');
const HomeScreenDI = require('../../../screenObjects/English/DI/home.screen.js');

const testUserDI = DimiDI;
const testUserCS = DimiCS;
test.setTimeout(60000);
const lang = "en"
const languageFile = JSON.parse(fs.readFileSync("tests/i18n/" + lang + "-CP.json"));
const strings = languageFile.screens.home;

/* *********************
replaced all btnLogin.click() to bounding box script because the button can't be found by it's default locator
    await loginScreenDI.btnLogin.click();
*************************



*/

// TODO: This has to be handled with environment variables (check AdmireMe)
const pageURL = 'https://qa.staging.cp.grandtourapp.com/' 

test.describe('Home page', (page) => {
    test.beforeEach(async ({ page }) => {
        const loginScreenCP = new LoginScreenCP(page, lang);
        await page.goto(pageURL);
        await page.waitForTimeout(2000);
        await loginScreenCP.inputUsername.fill(testUserCS.email);
        await loginScreenCP.inputPassword.fill(testUserCS.password);
        await page.waitForTimeout(1000);
        await loginScreenCP.btnLogin.click();
        await page.waitForSelector('text=Dashboard');
    });

    test.afterEach(async ({ page }) => {
        const navigationCP = new NavigationCP(page, lang);
        await navigationCP.hiUser.click();
        await navigationCP.signOut.click();
        await page.waitForSelector('text=Please sign in');
        await page.waitForTimeout(2000);
    });
    test('should show all UI elements', async ({ page }) => {
        const navigationCP = new NavigationCP(page, lang);
        // await expect(navigationCP.imgLogo).toBeVisible();
        await expect.soft(navigationCP.linkDashboard).toBeVisible();
        // await expect.soft(navigationCP.linkTransports).toBeVisible();
        await expect.soft(navigationCP.linkTicketCategories).toBeVisible();
        await expect.soft(navigationCP.linkTicketTypes).toBeVisible();
        await expect.soft(navigationCP.linkUsers).toBeVisible();
        // await expect.soft(navigationCP.linkVouchers).toBeVisible();
        // await expect.soft(navigationCP.linkSales).toBeVisible();
        await expect(navigationCP.hiUser).toBeVisible();
    });
    test.describe('Navigation bar', (page) => {
        test('all links should work', async ({ page }) => {
            const navigationCP = new NavigationCP(page, lang);
            const transportCP = new TransportsCP(page, lang);
            const ticketCategoriesCP = new TicketCategoriesCP(page, lang);
            const ticketTypesCP = new TicketTypesCP(page, lang);
            const usersCP = new UsersCP(page, lang);
            await navigationCP.linkDashboard.click();
            await page.waitForSelector('text=Sold Amount');
            // await navigationCP.linkTransports.click();
            // await expect.soft(transportCP.btnNewTransport).toBeVisible();
            await navigationCP.linkTicketCategories.click();
            await expect.soft(ticketCategoriesCP.newTicketCategory).toBeVisible();
            await navigationCP.linkTicketTypes.click();
            await expect.soft(ticketTypesCP.btnNewTicketType).toBeVisible();
            await navigationCP.linkUsers.click();
            await expect.soft(usersCP.btnNewUser).toBeVisible();
            // await navigationCP.linkVouchers.click();
            // await expect(vouchersCP.heading).toBeVisible();
            // await navigationCP.linkSales.click();
            // await expect(salesCP.heading).toBeVisible();
        });
    });
});    
