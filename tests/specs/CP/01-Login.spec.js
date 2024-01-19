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

    
test.describe('Login page', (page) => {
    test.beforeEach(async ({ page }) => {
        await page.goto(pageURL);
    });
    
    test('should show all UI elements', async ({ page }) => {
        const loginScreenCP = new LoginScreenCP(page);
        // await expect(loginScreenCP.imgLogo).toBeVisible();
        await expect(loginScreenCP.headingPleaseSignIn).toBeVisible();
        await expect(loginScreenCP.btnLogin).toBeVisible();
        await expect(loginScreenCP.inputUsername).toBeVisible();
        await expect(loginScreenCP.inputPassword).toBeVisible();
    });

    test('should login with valid credentials', async ({ page }) => {
        const loginScreenCP = new LoginScreenCP(page);
        await loginScreenCP.inputUsername.fill(testUserCS.username);
        await loginScreenCP.inputPassword.fill(testUserCS.password);
        await page.waitForTimeout(1000);
        await loginScreenCP.btnLogin.click();
        await page.waitForSelector('text=Dashboard');
        await expect(page.url()).toBe(pageURL);
    });

    test('should not login with invalid credentials', async ({ page }) => {
        const loginScreenCP = new LoginScreenCP(page);
        await loginScreenCP.inputUsername.fill(testUserCS.username);
        await loginScreenCP.inputPassword.fill('invalidPassword');
        await page.waitForTimeout(1000);
        await loginScreenCP.btnLogin.click();
        await (loginScreenCP.errorLabelFailedLogin).toBeVisible()
    });

    test('should not login with empty credentials', async ({ page }) => {
        const loginScreenCP = new LoginScreenCP(page);
        await page.waitForTimeout(1000);
        await loginScreenCP.btnLogin.click();
        await expect(page.getByText('Username : Username is required')).toBeVisible();
        await expect(page.getByText('Username : Username is required')).toBeVisible();
    });

    test.describe('Username field', () => {
        test('should prevent trailing spaces', async ({ page }) => {
            const loginScreenCP = new LoginScreenCP(page);
            await loginScreenCP.inputUsername.fill('username ');
            await expect(loginScreenCP.inputUsername).toHaveValue('username');
        });
        test('should prevent leading spaces', async ({ page }) => {
            const loginScreenCP = new LoginScreenCP(page);
            await loginScreenCP.inputUsername.fill(' username');
            await expect(loginScreenCP.inputUsername).toHaveValue('username');
        });
        test('should prevent leading and trailing spaces', async ({ page }) => {
            const loginScreenCP = new LoginScreenCP(page);
            await loginScreenCP.inputUsername.fill(' username ');
            await expect(loginScreenCP.inputUsername).toHaveValue('username');
        });
        test('should prevent spaces', async ({ page }) => {
            const loginScreenCP = new LoginScreenCP(page);
            await loginScreenCP.inputUsername.fill('username' + ' ' + 'username');
            await expect(loginScreenCP.inputUsername).toHaveValue('usernameusername');
        });
        test('should prevent special characters', async ({ page }) => {
            const loginScreenCP = new LoginScreenCP(page);
            await loginScreenCP.inputUsername.fill('username!@#$%^&*()');
            await expect(loginScreenCP.inputUsername).toHaveValue('username');
        });
    });
    test.describe('Password field', () => {
        test('should prevent trailing spaces', async ({ page }) => {
            const loginScreenCP = new LoginScreenCP(page);
            await loginScreenCP.inputPassword.fill('password ');
            await expect(loginScreenCP.inputPassword).toHaveValue('password');
        });
        test('should prevent leading spaces', async ({ page }) => {
            const loginScreenCP = new LoginScreenCP(page);
            await loginScreenCP.inputPassword.fill(' password');
            await expect(loginScreenCP.inputPassword).toHaveValue('password');
        });
        test('should prevent leading and trailing spaces', async ({ page }) => {
            const loginScreenCP = new LoginScreenCP(page);
            await loginScreenCP.inputPassword.fill(' password ');
            await expect(loginScreenCP.inputPassword).toHaveValue('password');
        });
        test('should prevent spaces', async ({ page }) => {
            const loginScreenCP = new LoginScreenCP(page);
            await loginScreenCP.inputPassword.fill('password' + ' ' + 'password');
            await expect(loginScreenCP.inputPassword).toHaveValue('passwordpassword');
        });
    });
});
