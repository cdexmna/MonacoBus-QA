import { test, expect, chromium } from '@playwright/test';
import { v4 as uuidv4 } from 'uuid';
import {loginCS} from '../../../helper/CS/functions.js';
import {DimiDI} from '../../../credentials-DI.json';
import {DimiCS} from '../../../credentials-CS.json';
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

    
test.describe('Users page', (page) => {
    test.beforeEach(async ({ page }) => {
        await page.goto(pageURL);
    });
    test.describe('Users page', (page) => {
        test.beforeEach(async ({ page }) => {
            const loginScreenCP = new LoginScreenCP(page);
            const navigationCP = new NavigationCP(page);
            await loginScreenCP.inputUsername.fill(testUserCS.username);
            await loginScreenCP.inputPassword.fill(testUserCS.password);
            await loginScreenCP.inputUsername.click();
            await loginScreenCP.btnLogin.click();
            await page.waitForSelector('text=Dashboard');
            await navigationCP.linkUsers.click();
        });
         // test.afterEach(async ({ page}) => {
    //     const navigationCP = new NavigationCP(page);
    //     const loginScreenCP = new LoginScreenCP(page)
    //     await navigationCP.hiAmigo.click();
    //     await navigationCP.signOut.click();
    //     await page.waitForSelector('text=Please sign in');
    // })
        test('should show all UI elements', async ({ page }) => {
            const usersCP = new UsersCP(page);
            const id30char = uuidv4();
            await page.waitForSelector('text=New User');
            await expect(usersCP.btnNewUser).toBeVisible();
            await usersCP.btnNewUser.click();
            await expect(usersCP.textCreateANewUser).toBeVisible();
            await expect(usersCP.btnBack).toBeVisible();
            await expect(usersCP.textEnrollANewUser).toBeVisible();
            await expect(usersCP.inputUserName).toBeVisible();
            await expect(usersCP.inputFirstName).toBeVisible();
            await expect(usersCP.inputLastName).toBeVisible();
            await expect(usersCP.inputEmail).toBeVisible();
            await expect(usersCP.btnSubmit).toBeVisible();
        });

        test('should create a new user', async ({ page }) => {
            const usersCP = new UsersCP(page);
            const id30char = uuidv4();
            const username = id30char.substring(0, 20)+'username';
            await page.waitForSelector('text=New User');
            await usersCP.btnNewUser.click();
            await page.waitForSelector('text=Create a new User');
            await usersCP.inputUserName.fill(username);
            await usersCP.inputFirstName.fill('Test');
            await usersCP.inputLastName.fill('User');
            await usersCP.inputEmail.fill(id30char+'@email.com');
            await usersCP.btnSubmit.click();
            await expect(usersCP.overlayCreatedSuccessfully).toBeVisible({timeout: 10000});
            await page.waitForSelector('text=New User');
            await expect(page.locator('text=' + username)).toBeVisible();
        });

        test.fixme('should be to create a new user and login the Drivers Interface with those credentials', async ({ page }) => {
            const loginScreenCP = new LoginScreenCP(page);
            const usersCP = new UsersCP(page);
            const id30char = uuidv4();
            const username = id30char.substring(0, 20);
            
            await page.waitForSelector('text=New User');
            await usersCP.btnNewUser.click();
            await page.waitForSelector('text=Create a new User');
            await usersCP.inputUserName.fill(username);
            await usersCP.inputFirstName.fill('Test');
            await usersCP.inputLastName.fill('User');
            await usersCP.inputEmail.fill('testEmail@email.com');
            await usersCP.btnSubmit.click();
            await expect(usersCP.overlayCreatedSuccessfully).toBeVisible({timeout: 10000});
            await page.waitForSelector('text=New User');
            await expect(page.locator('text=' + username)).toBeVisible();
            await page.goto('https://seashell-app-pkyfy.ondigitalocean.app/');
            await loginScreenCP.inputUsername.fill(username);
            await loginScreenCP.inputPassword.fill('password');
            await loginScreenCP.btnLogin.click();
            await page.waitForSelector('text=Select Your Vehicle');
        });
    });
});
