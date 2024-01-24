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

    // test.afterEach(async ({ page }) => {
    //     const navigationCP = new NavigationCP(page);
    //     await navigationCP.hiAmigo.click();
    //     await navigationCP.signOut.click();
    //     await page.waitForSelector('text=Please sign in');
    //     await page.waitForTimeout(2000);
    // });
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
    test.describe('New Ticket Category', (page) => {
        test('should test all fields for limits', async ({ page }) => {
            const ticketCategoriesCP = new TicketCategoriesCP(page);
            await ticketCategoriesCP.newTicketCategory.click();
            await ticketCategoriesCP.btnSubmit.click();
            await expect(ticketCategoriesCP.errorLabelNameRequired).toBeVisible({timeout:10000});
            await expect(ticketCategoriesCP.errorLabelPositionRequired).toBeVisible({timeout:10000});
            await page.waitForSelector('text=Create a new Ticket category');
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
        });
        test('Name field uniqueness constraint', async ({ page }) => {
            const ticketCategoriesCP = new TicketCategoriesCP(page);
            await ticketCategoriesCP.newTicketCategory.click();
            await ticketCategoriesCP.inputName.fill(name);
            await ticketCategoriesCP.inputPosition.fill('100');
            await ticketCategoriesCP.inputDescription.fill('Test Description');
            await ticketCategoriesCP.btnSubmit.click();
            await page.waitForSelector(`text=${name}`);
            // await expect(ticketCategoriesCP.overlayCreatedSuccessfully).toBeVisible({timeout: 10000});
            await page.waitForSelector('text=New Category');
            await ticketCategoriesCP.newTicketCategory.click();
            await ticketCategoriesCP.inputName.fill(name);
            await ticketCategoriesCP.inputPosition.fill('100');
            await ticketCategoriesCP.inputDescription.fill('Test Description');
            await ticketCategoriesCP.btnSubmit.click();
            await expect(ticketCategoriesCP.overlayCreateError).toBeVisible({timeout: 10000});
            await expect(ticketCategoriesCP.errorLabelNameAlreadyExist).toBeVisible();

            // DELETE THE TICKET CATEGORY
            await page.getByText(name).first().click();
            await page.waitForSelector('text=Edit Ticket Category');
            await ticketCategoriesCP.editTicketCategoryDeleteTicketCategory.click();
            await page.waitForSelector('text=Are you sure?');
            await ticketCategoriesCP.overlayDeleteTicketCategory.click();
            await page.waitForSelector('text=New Category');
        });
        test.describe('Function', (page) => {
            const id30char = uuidv4();
            const name = id30char.substring(0, 20);
            test.afterEach(async ({ page }) => {
                const ticketCategoriesCP = new TicketCategoriesCP(page);
                await page.getByText(name).first().click();
                await page.waitForSelector('text=Edit Ticket Category');
                await ticketCategoriesCP.editTicketCategoryDeleteTicketCategory.click();
                await page.waitForSelector('text=Are you sure?');
                await ticketCategoriesCP.overlayDeleteTicketCategory.click();
                await page.waitForSelector('text=New Category');
            });
            test('should create a new Ticket category', async ({ page }) => {
                const ticketCategoriesCP = new TicketCategoriesCP(page);
                const navigationCP = new NavigationCP(page);
               
                await navigationCP.linkTicketCategories.click();
                await page.waitForSelector('text=New Category');
                await ticketCategoriesCP.newTicketCategory.click();
                await page.waitForSelector('text=Create a new Ticket category');
                await ticketCategoriesCP.inputName.fill(name);
                await ticketCategoriesCP.inputPosition.fill('100');
                await ticketCategoriesCP.inputDescription.fill('Test Description');
                await ticketCategoriesCP.btnSubmit.click();
                await expect(ticketCategoriesCP.overlayCreatedSuccessfully).toBeVisible({timeout: 10000});
                await page.waitForSelector('text=New Category');
                await expect(page.locator('text=' + name)).toBeVisible();
            });
        });

        test.fixme('should create a new Ticket category  and show it in the home screen', async ({ page }) => {
            const ticketCategoriesCP = new TicketCategoriesCP(page);
            const navigationCP = new NavigationCP(page);
            const loginScreenDI = new LoginScreenDI(page, lang);
            const homeScreenDI = new HomeScreenDI(page, lang);
            const id30char = uuidv4();
            const name = id30char.substring(0, 20);
            await navigationCP.linkTicketCategories.click();
            await page.waitForSelector('text=New Category');
            await ticketCategoriesCP.newTicketCategory.click();
            await page.waitForSelector('text=Create a new Ticket category');
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
    });
    test.describe('Edit ticket category', (page) => {
        const nameEdit = id30char.substring(0, 20);
        test.beforeEach(async ({ page }) => {
            const description = 'Test description';
            const ticketCategoriesCP = new TicketCategoriesCP(page);
            
            await page.waitForSelector('text=New Category');
            await page.waitForTimeout(2000);
            await ticketCategoriesCP.btnNewCategory.click();
            await page.waitForSelector('text=Create a New Ticket Category');
            await ticketCategoriesCP.inputName.fill(nameEdit);
            await ticketCategoriesCP.inputDescription.fill(description);
            await ticketCategoriesCP.inputPosition.fill('100');
            await ticketCategoriesCP.btnSubmit.click();
            await page.waitForSelector('text=New Category');
        });
        test.afterEach(async ({ page }) => {
            const ticketCategoriesCP = new TicketCategoriesCP(page);    
            await page.getByText(nameEdit).first().click();
            await page.waitForSelector('text=Edit Ticket Category');
            await ticketCategoriesCP.editTicketCategoryDeleteTicketCategory.click();
            await page.waitForSelector('text=Are you sure?');
            await ticketCategoriesCP.overlayDeleteTicketCategory.click();
            await expect(page.getByText(nameEdit).first()).not.toBeVisible();
            await page.waitForSelector('text=New Category');
        });
        
        test.describe('check for UI elements', (page) => {
            test('tapping the Ticket Category name should open the edit ticket category wrapper', async ({ page }) => {
                const ticketCategoriesCP = new TicketCategoriesCP(page);
                const navigationCP = new NavigationCP(page);
                
                await navigationCP.linkTicketCategories.click();
                await page.waitForSelector('text=New Category');
                
                await page.getByText(nameEdit, {exact: true}).click();
                await page.waitForSelector('text=Edit Ticket Category');
                await expect(ticketCategoriesCP.editTicketCategoryHeading).toBeVisible();
                await expect(ticketCategoriesCP.editTicketCategoryName).toBeVisible();
                await expect(ticketCategoriesCP.editTicketCategoryUpdateTicketCategory).toBeVisible();
                await expect(ticketCategoriesCP.editTicketCategoryDeleteTicketCategoryHeading).toBeVisible();
                await expect(ticketCategoriesCP.editTicketCategoryDeleteTicketCategory).toBeVisible();
            });
            test('Name field uniqueness constraint', async ({ page }) => {
                const ticketCategoriesCP = new TicketCategoriesCP(page);
                const navigationCP = new NavigationCP(page);
                
                await navigationCP.linkTicketCategories.click();
                await page.waitForSelector('text=New Category');
                
                await page.getByText(nameEdit).first().click();
                await page.waitForSelector('text=Edit Ticket Category');
                await ticketCategoriesCP.editTicketCategoryName.fill('alreadyExist');
                await ticketCategoriesCP.editTicketCategoryUpdateTicketCategory.click();
                await expect(ticketCategoriesCP.errorLabelNameAlreadyExist).toBeVisible();
                await expect(ticketCategoriesCP.overlayUpdateError).toBeVisible({timeout: 10000});
            });
        });
        test.describe('Function', (page) => {
            
            // test.beforeEach(async ({ page }) => {
            //     const description = 'Test description';
            //     const ticketCategoriesCP = new TicketCategoriesCP(page);
                
            //     await page.waitForSelector('text=New Category');
            //     await ticketCategoriesCP.btnNewCategory.click();
            //     await page.waitForSelector('text=Create a New Ticket Category');
            //     await ticketCategoriesCP.inputName.fill(nameEdit);
            //     await ticketCategoriesCP.inputDescription.fill(description);
            //     await ticketCategoriesCP.inputPosition.fill('100');
            //     await ticketCategoriesCP.btnSubmit.click();
            //     await page.waitForSelector('text=New Category');
            // });
            test('should update the Ticket Category - all fields', async ({ page }) => {
                const ticketCategoriesCP = new TicketCategoriesCP(page);
                const navigationCP = new NavigationCP(page);
                
                await navigationCP.linkTicketCategories.click();
                await page.waitForSelector('text=New Category');
                
                await page.getByText(nameEdit).first().click();
                await page.waitForSelector('text=Edit Ticket Category');
                await ticketCategoriesCP.editTicketCategoryName.fill(nameEdit + ' Edited');
                await ticketCategoriesCP.editTicketCategoryPosition.fill('200');
                await ticketCategoriesCP.editTicketCategoryDescription.fill('Edited description');
                await ticketCategoriesCP.editTicketCategoryUpdateTicketCategory.click();
                await page.waitForSelector('text=New Category');
                await expect(ticketCategoriesCP.overlayUpdatedSuccessfully).toBeVisible();
                await expect(page.getByRole('row', { name: nameEdit+'Test description 100' })).not.toBeVisible();
                await expect(page.getByRole('row', { name: nameEdit + ' Edited Edited description 200' })).toBeVisible();
                // await expect(ticketCategoriesCP.editTicketCategoryHeading).not.toBeVisible();
            });
        });
    });
    test.describe('Delete Ticket Categories', (page) => { // BUG 8181 - can use only one test at a time in this describe
        test.describe('check for UI elements', (page) => {
            const nameDelete = id30char.substring(0, 30);
            test.beforeEach(async ({ page }) => {
                const description = 'Test description';
                const ticketCategoriesCP = new TicketCategoriesCP(page);
                
                await page.waitForSelector('text=New Category');
                await page.waitForTimeout(2000);
                await ticketCategoriesCP.btnNewCategory.click();
                await page.waitForSelector('text=Create a New Ticket Category');
                await ticketCategoriesCP.inputName.fill(nameDelete);
                await ticketCategoriesCP.inputPosition.fill('100');
                await ticketCategoriesCP.inputDescription.fill(description);
                await ticketCategoriesCP.btnSubmit.click();
                await page.waitForSelector('text=New Category');
            });
            test.afterEach(async ({ page }) => {
                const ticketCategoriesCP = new TicketCategoriesCP(page);
                await page.getByText(nameDelete).first().click();
                await page.waitForSelector('text=Edit Ticket Category');
                await ticketCategoriesCP.editTicketCategoryDeleteTicketCategory.click();
                await page.waitForSelector('text=Are you sure?');
                await ticketCategoriesCP.overlayDeleteTicketCategory.click();
                await expect(page.getByText(nameDelete).first()).not.toBeVisible();
                await page.waitForSelector('text=New Category');
            });
            test('check all elements for delete Ticket Category', async ({ page }) => {
                const ticketCategoriesCP = new TicketCategoriesCP(page);
                const navigationCP = new NavigationCP(page);
                
                await navigationCP.linkTicketCategories.click();
                await page.waitForSelector('text=New Category');
                
                await page.getByText(nameDelete).click();
                await page.waitForSelector('text=Edit Ticket Category');
                // await ticketCategoriesCP.editTicketCategoryDeleteTicketCategory.click();
                await page.waitForSelector('text=New Category');
                await expect(ticketCategoriesCP.editTicketCategoryDeleteTicketCategoryHeading).toBeVisible();
                await expect(ticketCategoriesCP.editTicketCategoryDeleteTicketCategory).toBeVisible();
            });
            test('check for alert messages on delete Ticket Category', async ({ page }) => {
                const ticketCategoriesCP = new TicketCategoriesCP(page);
                const navigationCP = new NavigationCP(page);
                
                await page.getByText(nameDelete).click();
                await page.waitForSelector('text=Edit Ticket Category');
                await ticketCategoriesCP.editTicketCategoryDeleteTicketCategory.click();
                await page.waitForSelector('text=Are you sure?');
                await expect(ticketCategoriesCP.editTicketCategoryDeleteTicketCategoryAlertTitle).toBeVisible();
                await expect(ticketCategoriesCP.editTicketCategoryDeleteTicketCategoryAlertMessage).toBeVisible();
                await expect(ticketCategoriesCP.editTicketCategoryDeleteTicketCategoryGoBack).toBeVisible();
                await ticketCategoriesCP.editTicketCategoryDeleteTicketCategoryGoBack.click();
            });
            test('should go back to edit ticket category', async ({ page }) => {
                const ticketCategoriesCP = new TicketCategoriesCP(page);
                const navigationCP = new NavigationCP(page);
                
                await navigationCP.linkTicketCategories.click();
                await page.waitForSelector('text=New Category');
                
                await page.getByText(nameDelete).first().click();
                await page.waitForSelector('text=Edit Ticket Category');
                await ticketCategoriesCP.editTicketCategoryDeleteTicketCategory.click();
                await ticketCategoriesCP.editTicketCategoryDeleteTicketCategoryGoBack.click();
                await page.waitForSelector('text=Edit Ticket Category');
                await expect(ticketCategoriesCP.editTicketCategoryDeleteTicketCategoryAlertMessage).not.toBeVisible();
            });
        });
        test.describe('Function', (page) => {
            test('should delete the ticket category', async ({ page }) => {
                const nameDelete = id30char.substring(0, 30);
                const description = 'Test description';
                const ticketCategoriesCP = new TicketCategoriesCP(page);
                
                await page.waitForSelector('text=New Category');
                await ticketCategoriesCP.btnNewCategory.click();
                await page.waitForSelector('text=Create a New Ticket Category');
                await ticketCategoriesCP.inputName.fill(nameDelete);
                await ticketCategoriesCP.inputPosition.fill('100');
                await ticketCategoriesCP.inputDescription.fill(description);
                await ticketCategoriesCP.btnSubmit.click();
                await page.waitForSelector('text=New Category');

                const navigationCP = new NavigationCP(page);
                
                await navigationCP.linkTicketCategories.click();
                await page.waitForSelector('text=New Category');
                
                await page.getByText(nameDelete).first().click();
                await page.waitForSelector('text=Edit Ticket Category');
                await ticketCategoriesCP.editTicketCategoryDeleteTicketCategory.click();
                await page.waitForSelector('text=Are you sure?');
                await ticketCategoriesCP.overlayDeleteTicketCategory.click();
                await expect(ticketCategoriesCP.overlayDeletedSuccessfully).toBeVisible();
                await page.waitForSelector('text=New Category');
                await expect(page.getByRole('row', { name: nameDelete + ' Test description 100' })).not.toBeVisible();
            });
        });
    });
});
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
        test.describe('New User', (page) => {
            test('should test all fields for limits', async ({ page }) => {
                const usersCP = new UsersCP(page);
                const id30char = uuidv4();
                const username = id30char.substring(0, 20);
                await page.waitForSelector('text=New User');
                await usersCP.btnNewUser.click();
                await page.waitForSelector('text=Create a new User');
                await usersCP.btnSubmit.click();
                await expect(usersCP.errorLabelUserNameRequired).toBeVisible({timeout:10000});
                // await expect(usersCP.errorLabelFirstNameRequired).toBeVisible({timeout:10000});
                await expect(usersCP.errorLabelLastNameRequired).toBeVisible({timeout:10000});
                await expect(usersCP.errorLabelEmailRequired).toBeVisible({timeout:10000});
                await page.waitForSelector('text=Create a new User');
                await usersCP.inputUserName.fill(username);
                await usersCP.inputFirstName.fill('Test');
                await usersCP.inputLastName.fill('User');
                await usersCP.inputEmail.fill(username + '@email.com');
                await expect(usersCP.errorLabelUserNameRequired).not.toBeVisible({timeout:10000});
                await expect(usersCP.errorLabelFirstNameRequired).not.toBeVisible({timeout:10000});
                await expect(usersCP.errorLabelLastNameRequired).not.toBeVisible({timeout:10000});
                await expect(usersCP.errorLabelEmailRequired).not.toBeVisible({timeout:10000});
            });
            test('username field uniqueness constraint', async ({ page }) => {
                const usersCP = new UsersCP(page);
                const id30char = uuidv4();
                const username = id30char.substring(0, 20);
                await page.waitForSelector('text=New User');
                await usersCP.btnNewUser.click();
                await page.waitForSelector('text=Create a new User');
                await usersCP.inputUserName.fill('alreadyExist');
                await usersCP.inputFirstName.fill('Test');
                await usersCP.inputLastName.fill('User');
                await usersCP.inputEmail.fill(username + '@email.com');
                await usersCP.btnSubmit.click();
                await expect(usersCP.overlayCreateError).toBeVisible({timeout: 10000});
                await expect(usersCP.errorLabelUserNameAlreadyExist).toBeVisible();
            });
            test('email field uniqueness constraint', async ({ page }) => {
                const usersCP = new UsersCP(page);
                const id30char = uuidv4();
                const username = id30char.substring(0, 20);
                await page.waitForSelector('text=New User');
                await usersCP.btnNewUser.click();
                await page.waitForSelector('text=Create a new User');
                await usersCP.inputUserName.fill(username);
                await usersCP.inputFirstName.fill('Test');
                await usersCP.inputLastName.fill('User');
                await usersCP.inputEmail.fill('alreadyExist@email.com');
                await usersCP.btnSubmit.click();
                await expect(usersCP.overlayCreateError).toBeVisible({timeout: 10000});
                await expect(usersCP.errorLabelEmailAlreadyExist).toBeVisible();
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
