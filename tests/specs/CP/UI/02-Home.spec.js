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
const UsersCP = require('../../../screenObjects/CP/Users.screen.js');
const HomeScreenDI = require('../../../screenObjects/English/DI/home.screen.js');

const testUserDI = DimiDI;
const testUserCS = DimiCS;
test.setTimeout(180000);
const lang = "en"
const languageFile = JSON.parse(fs.readFileSync("tests/i18n/" + lang + "-CP.json"));
const strings = languageFile.screens.home;

/* *********************
replaced all btnLogin.click() to bounding box script because the button can't be found by it's default locator
    await loginScreenDI.btnLogin.click();
*************************



*/

// TODO: This has to be handled with environment variables (check AdmireMe)
const pageURL = 'https://ticketing-admin-frontend-j6hga.ondigitalocean.app/' 

test.describe('Home page', (page) => {
    test.beforeEach(async ({ page }) => {
        const loginScreenCP = new LoginScreenCP(page);
        await page.goto(pageURL);
        await page.waitForTimeout(2000);
        await loginScreenCP.inputUsername.fill(testUserCS.username);
        await loginScreenCP.inputPassword.fill(testUserCS.password);
        await page.waitForTimeout(1000);
        await loginScreenCP.btnLogin.click();
        await page.waitForSelector('text=Dashboard');
    });

    test.afterEach(async ({ page }) => {
        const navigationCP = new NavigationCP(page);
        await navigationCP.hiAmigo.click();
        await navigationCP.signOut.click();
        await page.waitForSelector('text=Please sign in');
        await page.waitForTimeout(2000);
    });
    test('should show all UI elements', async ({ page }) => {
        const navigationCP = new NavigationCP(page);
        // await expect(navigationCP.imgLogo).toBeVisible();
        await expect(navigationCP.linkDashboard).toBeVisible();
        await expect(navigationCP.linkTransports).toBeVisible();
        await expect(navigationCP.linkTicketCategories).toBeVisible();
        await expect(navigationCP.linkTicketTypes).toBeVisible();
        await expect(navigationCP.linkUsers).toBeVisible();
        await expect(navigationCP.linkVouchers).toBeVisible();
        await expect(navigationCP.linkSales).toBeVisible();
        await expect(navigationCP.hiAmigo).toBeVisible();
    });
    test.describe('Navigation bar', (page) => {
        test('all links should work', async ({ page }) => {
            const navigationCP = new NavigationCP(page);
            const transportCP = new TransportsCP(page);
            const ticketCategoriesCP = new TicketCategoriesCP(page);
            const usersCP = new UsersCP(page);
            await navigationCP.linkDashboard.click();
            await page.waitForSelector('text=Total amount sold this year');
            await navigationCP.linkTransports.click();
            await expect(transportCP.btnNewTransport).toBeVisible();
            await navigationCP.linkTicketCategories.click();
            await expect(ticketCategoriesCP.newTicketCategory).toBeVisible();
            // await navigationCP.linkTicketTypes.click();
            // await expect(ticketTypesCP.newTicketType).toBeVisible();
            await navigationCP.linkUsers.click();
            await expect(usersCP.btnNewUser).toBeVisible();
            // await navigationCP.linkVouchers.click();
            // await expect(vouchersCP.heading).toBeVisible();
            // await navigationCP.linkSales.click();
            // await expect(salesCP.heading).toBeVisible();
        });
    });
});    
