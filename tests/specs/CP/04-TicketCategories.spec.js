import { test, expect, chromium } from '@playwright/test';
import { v4 as uuidv4 } from 'uuid';
import {loginCS} from '../../helper/CS/functions.js';
import {DimiDI} from '../../credentials-DI.json';
import {DimiCS} from '../../credentials-CS.json';
const fs = require("fs");
// import TransportsCP from '../../screenObjects/CP/Transports.screen.js';

const LoginScreenCP = require('../../screenObjects/CP/login.screen.js');
const LoginScreenDI = require('../../screenObjects/English/DI/login.screen.js');
const NavigationCP = require('../../screenObjects/CP/navigation.wrapper.js');
const TransportsCP = require('../../screenObjects/CP/Transports.screen.js');
const TicketCategoriesCP = require('../../screenObjects/CP/TicketCategories.screen.js');
const UsersCP = require('../../screenObjects/CP/Users.screen.js');
const HomeScreenDI = require('../../screenObjects/English/DI/home.screen.js');

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
test.describe('Ticket Categories page', (page) => {
    test.beforeEach(async ({ page }) => {
        const loginScreenCP = new LoginScreenCP(page);
        const navigationCP = new NavigationCP(page);
        await page.goto(pageURL);
        await loginScreenCP.inputUsername.fill(testUserCS.username);
        await loginScreenCP.inputPassword.fill(testUserCS.password);
        await page.waitForTimeout(1000);
        await loginScreenCP.btnLogin.click();
        await page.waitForSelector('text=Dashboard');
        await navigationCP.linkTicketCategories.click();
        await page.waitForSelector('text=New Category');
    });

    test.afterEach(async ({ page }) => {
        const navigationCP = new NavigationCP(page);
        await navigationCP.hiAmigo.click();
        await navigationCP.signOut.click();
        await page.waitForSelector('text=Please sign in');
        await page.waitForTimeout(2000);
    });
    test('should show all UI elements', async ({ page }) => {
        const ticketCategoriesCP = new TicketCategoriesCP(page);
        await expect(ticketCategoriesCP.newTicketCategory).toBeVisible();
        await ticketCategoriesCP.newTicketCategory.click();
        await expect(ticketCategoriesCP.textCreateANewTicketCategory).toBeVisible();
        await expect(ticketCategoriesCP.btnBack).toBeVisible();
        // await expect(ticketCategoriesCP.textSetANewTicketCategory).toBeVisible();
        await expect(ticketCategoriesCP.inputName).toBeVisible();
        await expect(ticketCategoriesCP.inputPosition).toBeVisible();
        await expect(ticketCategoriesCP.inputDescription).toBeVisible();
        await expect(ticketCategoriesCP.btnSubmit).toBeVisible();
    });

    test('should test all fields for limits', async ({ page }) => {
        const ticketCategoriesCP = new TicketCategoriesCP(page);
        await ticketCategoriesCP.newTicketCategory.click();
        await ticketCategoriesCP.btnSubmit.click();
        await expect(ticketCategoriesCP.errorLabelNameRequired).toBeVisible({timeout:10000});
        await expect(ticketCategoriesCP.errorLabelPositionRequired).toBeVisible({timeout:10000});
        await page.waitForSelector('text=Create a new ticket category');
        await ticketCategoriesCP.inputName.fill('12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890');
        await expect(ticketCategoriesCP.errorLabelNameRequired).not.toBeVisible({timeout:10000});
        await ticketCategoriesCP.inputPosition.fill('-100');
        await ticketCategoriesCP.inputDescription.fill('1234567890');
        await ticketCategoriesCP.btnSubmit.click();
        await expect(ticketCategoriesCP.errorLabelPosition).toBeVisible();
        await ticketCategoriesCP.inputPosition.fill('1');
        await ticketCategoriesCP.btnSubmit.click();
        await expect(ticketCategoriesCP.errorLabelName).toBeVisible();
        await ticketCategoriesCP.inputName.fill('Test Name');
        await expect(ticketCategoriesCP.errorLabelName).not.toBeVisible();
    })

    test('should create a new ticket category', async ({ page }) => {
        const ticketCategoriesCP = new TicketCategoriesCP(page);
        const navigationCP = new NavigationCP(page);
        const id30char = uuidv4();
        const name = id30char.substring(0, 20);
        await navigationCP.linkTicketCategories.click();
        await page.waitForSelector('text=New Category');
        await ticketCategoriesCP.newTicketCategory.click();
        await page.waitForSelector('text=Create a new ticket category');
        await ticketCategoriesCP.inputName.fill(name);
        await ticketCategoriesCP.inputPosition.fill('100');
        await ticketCategoriesCP.inputDescription.fill('Test Description');
        await ticketCategoriesCP.btnSubmit.click();
        await expect(ticketCategoriesCP.overlayCreatedSuccessfully).toBeVisible({timeout: 10000});
        await page.waitForSelector('text=New Category');
        await expect(page.locator('text=' + name)).toBeVisible();
    });

    test.fixme('should create a new ticket category  and show it in the home screen', async ({ page }) => {
        const ticketCategoriesCP = new TicketCategoriesCP(page);
        const navigationCP = new NavigationCP(page);
        const loginScreenDI = new LoginScreenDI(page, lang);
        const homeScreenDI = new HomeScreenDI(page, lang);
        const id30char = uuidv4();
        const name = id30char.substring(0, 20);
        await navigationCP.linkTicketCategories.click();
        await page.waitForSelector('text=New Category');
        await ticketCategoriesCP.newTicketCategory.click();
        await page.waitForSelector('text=Create a new ticket category');
        await ticketCategoriesCP.inputName.fill(name);
        await ticketCategoriesCP.inputPosition.fill('1');
        await ticketCategoriesCP.inputDescription.fill('Test Description');
        await ticketCategoriesCP.btnSubmit.click();
        await expect(ticketCategoriesCP.overlayCreatedSuccessfully).toBeVisible({timeout: 10000});
        await page.waitForSelector('text=New Category');
        await expect(page.locator('text=' + name)).toBeVisible();
        await page.waitForTimeout(10000);
        await page.goto('https://seashell-app-pkyfy.ondigitalocean.app/');
        await loginScreenDI.textUsername.fill(testUserDI.username);
        await loginScreenDI.textPassword.fill(testUserDI.password);
        await loginScreenDI.btnLogin.click();
        await page.waitForSelector('text=Select Your Vehicle');
        await loginScreenDI.drpSelectAVehicle.selectOption({ label: 'Automation Bus -' });
        await loginScreenDI.textMileage.fill('1000');
        await loginScreenDI.btnSelect.click();
        await page.waitForSelector('text=' + strings.link_read_voucher);
        await expect(page.locator('text=' + name)).toBeVisible();
    });

    // test('should remove a ticket category', async ({ page }) => {

    // });
});

