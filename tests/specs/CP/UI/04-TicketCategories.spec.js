import { test, expect, chromium } from '@playwright/test';
import { v4 as uuidv4 } from 'uuid';
import {loginCS} from '../../../helper/CS/functions.js';
import {DimiDI} from '../../../credentials-DI.json';
import {DimiCS} from '../../../credentials-CS.json';
const fs = require("fs");
// import ticketCategoriesCP from '../../screenObjects/CP/TicketCategorys.screen.js';

const LoginScreenCP = require('../../../screenObjects/CP/login.screen.js');
const LoginScreenDI = require('../../../screenObjects/English/DI/login.screen.js');
const NavigationCP = require('../../../screenObjects/CP/navigation.wrapper.js');
const ticketCategoriesCP = require('../../../screenObjects/CP/TicketCategories.screen.js');
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
const pageURL = 'https://qa.staging.cp.grandtourapp.com/';
const id30char = uuidv4();
const name = id30char.substring(0, 20);

test.describe('Ticket Categories page', (page) => {
    test.beforeEach(async ({ page }) => {
        const loginScreenCP = new LoginScreenCP(page, lang);
        const navigationCP = new NavigationCP(page, lang);
        await page.goto(pageURL);
        await loginScreenCP.inputUsername.fill(testUserCS.email);
        await loginScreenCP.inputPassword.fill(testUserCS.password);
        await page.waitForTimeout(1000);
        await loginScreenCP.btnLogin.click();
        await page.waitForSelector('text=Dashboard');
        await navigationCP.linkTicketCategories.click();
        await page.waitForSelector('text=New Category');
    });

    // test.afterEach(async ({ page }) => {
    //     const navigationCP = new NavigationCP(page, lang);
    //     await navigationCP.hiUser.click();
    //     await navigationCP.signOut.click();
    //     await page.waitForSelector('text=Please sign in');
    //     await page.waitForTimeout(2000);
    // });
    test('should show all UI elements', async ({ page }) => {
        const ticketCategoriesCP = new TicketCategoriesCP(page, lang);
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
        test('submit button is disabled if mandatory inputs arent filled', async ({ page }) => {
            const ticketCategoriesCP = new TicketCategoriesCP(page, lang);
            await ticketCategoriesCP.newTicketCategory.click();
            await expect(ticketCategoriesCP.btnSubmit).toBeDisabled();
        });

        test('submit button is enabled if mandatory inputs are filled', async ({ page }) => {
            const ticketCategoriesCP = new TicketCategoriesCP(page, lang);
            await ticketCategoriesCP.newTicketCategory.click();
            await ticketCategoriesCP.inputName.fill('Test Name');
            await ticketCategoriesCP.inputPosition.fill('100');
            await ticketCategoriesCP.inputDescription.fill('Test Description');
            await expect(ticketCategoriesCP.btnSubmit).toBeEnabled();
        });

        test('should test all fields for limits', async ({ page }) => {
            const ticketCategoriesCP = new TicketCategoriesCP(page, lang);
            await ticketCategoriesCP.newTicketCategory.click();
            await ticketCategoriesCP.inputName.fill('123');
            await ticketCategoriesCP.inputPosition.click();
            await ticketCategoriesCP.inputName.fill('');
            await ticketCategoriesCP.inputPosition.click();
            // await ticketCategoriesCP.btnSubmit.click();
            await expect(ticketCategoriesCP.errorLabelNameRequired).toBeVisible({timeout:10000});
            await expect(ticketCategoriesCP.errorLabelPositionRequired).toBeVisible({timeout:10000});
            await page.waitForSelector('text=Create a new Category');
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
            const ticketCategoriesCP = new TicketCategoriesCP(page, lang);
            await ticketCategoriesCP.newTicketCategory.click();
            await ticketCategoriesCP.inputName.fill('alreadyUsed');
            await ticketCategoriesCP.inputPosition.fill('100');
            await ticketCategoriesCP.inputDescription.fill('Test Description');
            await ticketCategoriesCP.btnSubmit.click();
           
            await expect.soft(ticketCategoriesCP.overlayCreateError).toBeVisible({timeout: 10000});
            await expect(ticketCategoriesCP.errorLabelNameAlreadyExist).toBeVisible();

            // DELETE THE TICKET CATEGORY
            // await page.getByText(name).first().click();
            // await page.waitForSelector('text=Edit Category');
            // await ticketCategoriesCP.editTicketCategoryDeleteTicketCategory.click();
            // await page.waitForSelector('text=Are you sure?');
            // await ticketCategoriesCP.overlayDeleteTicketCategory.click();
            // await page.waitForSelector('text=New Category');
        });
        test.describe('Function', (page) => {
            const id30char = uuidv4();
            const name = id30char.substring(0, 20);
            // test.afterEach(async ({ page }) => {
            //     const ticketCategoriesCP = new TicketCategoriesCP(page, lang);
            //     await page.getByText(name).first().click();
            //     await page.waitForSelector('text=Edit Category');
            //     await ticketCategoriesCP.editTicketCategoryDeleteTicketCategory.click();
            //     await page.waitForSelector('text=Are you sure?');
            //     await ticketCategoriesCP.overlayDeleteTicketCategory.click();
            //     await page.waitForSelector('text=New Category');
            // });
                test('should create a new Ticket category', async ({ page }) => {
                const ticketCategoriesCP = new TicketCategoriesCP(page, lang);
                const navigationCP = new NavigationCP(page, lang);
               
                await navigationCP.linkTicketCategories.click();
                await page.waitForSelector('text=New Category');
                await ticketCategoriesCP.newTicketCategory.click();
                await page.waitForSelector('text=Create a new Category');
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
            const ticketCategoriesCP = new TicketCategoriesCP(page, lang);
            const navigationCP = new NavigationCP(page, lang);
            const loginScreenDI = new LoginScreenDI(page, lang);
            const homeScreenDI = new HomeScreenDI(page, lang);
            const id30char = uuidv4();
            const name = id30char.substring(0, 20);
            await navigationCP.linkTicketCategories.click();
            await page.waitForSelector('text=New Category');
            await ticketCategoriesCP.newTicketCategory.click();
            await page.waitForSelector('text=Create a new Category');
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
    test.describe('Edit Category', (page) => {
        const nameEdit = id30char.substring(0, 20);
        // test.beforeEach(async ({ page }) => {
        //     const description = 'Test description';
        //     const ticketCategoriesCP = new TicketCategoriesCP(page, lang);
            
        //     await page.waitForSelector('text=New Category');
        //     await page.waitForTimeout(2000);
        //     await ticketCategoriesCP.btnNewCategory.click();
        //     await page.waitForSelector('text=Create a new Category');
        //     await ticketCategoriesCP.inputName.fill(nameEdit);
        //     await ticketCategoriesCP.inputDescription.fill(description);
        //     await ticketCategoriesCP.inputPosition.fill('100');
        //     await ticketCategoriesCP.btnSubmit.click();
        //     await page.waitForSelector('text=New Category');
        // });
        // test.afterEach(async ({ page }) => {
        //     const ticketCategoriesCP = new TicketCategoriesCP(page, lang);    
        //     await page.getByText(nameEdit).first().click();
        //     await page.waitForSelector('text=Edit Category');
        //     await ticketCategoriesCP.editTicketCategoryDeleteTicketCategory.click();
        //     await page.waitForSelector('text=Are you sure?');
        //     await ticketCategoriesCP.overlayDeleteTicketCategory.click();
        //     await expect(page.getByText(nameEdit).first()).not.toBeVisible();
        //     await page.waitForSelector('text=New Category');
        // });
        test('editing a ticket category already has all prefilled values', async ({page}) => {
            const ticketCategoriesCP = new TicketCategoriesCP(page, lang);
            const navigationCP = new NavigationCP(page, lang);
            
            await navigationCP.linkTicketCategories.click();
            await page.waitForSelector('text=New Category');
            
            await page.getByText('forEdit', {exact: true}).click();
            await page.waitForSelector('text=Edit Category');

            await expect.soft(ticketCategoriesCP.editTicketCategoryName).toHaveValue('forEdit');
            await expect.soft(ticketCategoriesCP.editTicketCategoryPosition).toHaveValue('0');
            await expect.soft(ticketCategoriesCP.inputDescription).toHaveValue("don't remove - used for AUTOMATION");
        });
        
        test.describe('check for UI elements', (page) => { //BUG: Use one test at a time - can't create 2 in a row
            test('tapping the Ticket Category name should open the Edit Category wrapper', async ({ page }) => {
                const ticketCategoriesCP = new TicketCategoriesCP(page, lang);
                const navigationCP = new NavigationCP(page, lang);
                
                await navigationCP.linkTicketCategories.click();
                await page.waitForSelector('text=New Category');
                
                await page.getByText('forEdit', {exact: true}).click();
                await page.waitForSelector('text=Edit Category');
                await expect(ticketCategoriesCP.editTicketCategoryHeading).toBeVisible();
                await expect(ticketCategoriesCP.editTicketCategoryName).toBeVisible();
                await expect(ticketCategoriesCP.editTicketCategoryUpdateTicketCategory).toBeVisible();
                // await expect(ticketCategoriesCP.editTicketCategoryDeleteTicketCategoryHeading).toBeVisible();
                // await expect(ticketCategoriesCP.editTicketCategoryDeleteTicketCategory).toBeVisible();
            });
            test('Name field uniqueness constraint', async ({ page }) => {
                const ticketCategoriesCP = new TicketCategoriesCP(page, lang);
                const navigationCP = new NavigationCP(page, lang);
                
                await navigationCP.linkTicketCategories.click();
                await page.waitForSelector('text=New Category');
                
                await page.getByText('forEdit').first().click();
                await page.waitForSelector('text=Edit Category');
                await ticketCategoriesCP.editTicketCategoryName.fill('alreadyExist');
                await ticketCategoriesCP.editTicketCategoryUpdateTicketCategory.click();
                await expect(ticketCategoriesCP.errorLabelNameAlreadyExist).toBeVisible();
                await expect(ticketCategoriesCP.overlayUpdateError).toBeVisible({timeout: 10000});
            });
        });
        test.describe('Function', (page) => {
            
            // test.beforeEach(async ({ page }) => {
            //     const description = 'Test description';
            //     const ticketCategoriesCP = new TicketCategoriesCP(page, lang);
                
            //     await page.waitForSelector('text=New Category');
            //     await ticketCategoriesCP.btnNewCategory.click();
            //     await page.waitForSelector('text=Create a new Category');
            //     await ticketCategoriesCP.inputName.fill(nameEdit);
            //     await ticketCategoriesCP.inputDescription.fill(description);
            //     await ticketCategoriesCP.inputPosition.fill('100');
            //     await ticketCategoriesCP.btnSubmit.click();
            //     await page.waitForSelector('text=New Category');
            // });
            test('should update the Ticket Category - all fields', async ({ page }) => {
                const ticketCategoriesCP = new TicketCategoriesCP(page, lang);
                const navigationCP = new NavigationCP(page, lang);
                
                await navigationCP.linkTicketCategories.click();
                await page.waitForSelector('text=New Category');
                
                await page.getByText('forEdit').first().click();
                await page.waitForSelector('text=Edit Category');
                await ticketCategoriesCP.editTicketCategoryName.fill(nameEdit + ' Edited');
                await ticketCategoriesCP.editTicketCategoryPosition.fill('200');
                await ticketCategoriesCP.editTicketCategoryDescription.fill('Edited description');
                await ticketCategoriesCP.editTicketCategoryUpdateTicketCategory.click();
                await page.waitForSelector('text=New Category');
                await expect(ticketCategoriesCP.overlayUpdatedSuccessfully).toBeVisible();
                await expect(page.getByText("forEditdon't remove - used for AUTOMATION")).not.toBeVisible();
                await expect(page.getByText(nameEdit + ' EditedEdited description200')).toBeVisible();
                
                await page.waitForTimeout(3000);
                const editedLocator = page.getByText(nameEdit)
                await editedLocator.click()

                await ticketCategoriesCP.editTicketCategoryName.fill('forEdit');
                await ticketCategoriesCP.editTicketCategoryDescription.fill("don't remove - used for AUTOMATION");
                await ticketCategoriesCP.editTicketCategoryPosition.fill('0');
                await ticketCategoriesCP.editTicketCategoryUpdateTicketCategory.click();
                await page.waitForSelector('text=New Category');
                await expect(page.getByText("forEditdon't remove - used for AUTOMATION")).toBeVisible();
                // await expect(ticketCategoriesCP.editTicketCategoryHeading).not.toBeVisible();
            });
        });
    });
    test.describe.skip('Delete Ticket Categories', (page) => { // BUG 8181 - can use only one test at a time in this describe
        test.describe('check for UI elements', (page) => {
            const nameDelete = id30char.substring(0, 30);
            test.beforeEach(async ({ page }) => {
                const description = 'Test description';
                const ticketCategoriesCP = new TicketCategoriesCP(page, lang);
                
                await page.waitForSelector('text=New Category');
                await page.waitForTimeout(2000);
                await ticketCategoriesCP.btnNewCategory.click();
                await page.waitForSelector('text=Create a new Category');
                await ticketCategoriesCP.inputName.fill(nameDelete);
                await ticketCategoriesCP.inputPosition.fill('100');
                await ticketCategoriesCP.inputDescription.fill(description);
                await ticketCategoriesCP.btnSubmit.click();
                await page.waitForSelector('text=New Category');
            });
            test.afterEach(async ({ page }) => {
                const ticketCategoriesCP = new TicketCategoriesCP(page, lang);
                await page.getByText(nameDelete).first().click();
                await page.waitForSelector('text=Edit Category');
                await ticketCategoriesCP.editTicketCategoryDeleteTicketCategory.click();
                await page.waitForSelector('text=Are you sure?');
                await ticketCategoriesCP.overlayDeleteTicketCategory.click();
                await expect(page.getByText(nameDelete).first()).not.toBeVisible();
                await page.waitForSelector('text=New Category');
            });
            test('check all elements for delete Ticket Category', async ({ page }) => {
                const ticketCategoriesCP = new TicketCategoriesCP(page, lang);
                const navigationCP = new NavigationCP(page, lang);
                
                await navigationCP.linkTicketCategories.click();
                await page.waitForSelector('text=New Category');
                
                await page.getByText(nameDelete).click();
                await page.waitForSelector('text=Edit Category');
                // await ticketCategoriesCP.editTicketCategoryDeleteTicketCategory.click();
                await page.waitForSelector('text=New Category');
                await expect(ticketCategoriesCP.editTicketCategoryDeleteTicketCategoryHeading).toBeVisible();
                await expect(ticketCategoriesCP.editTicketCategoryDeleteTicketCategory).toBeVisible();
            });
            test('check for alert messages on delete Ticket Category', async ({ page }) => { // BUG: User only one test
                const ticketCategoriesCP = new TicketCategoriesCP(page, lang);
                const navigationCP = new NavigationCP(page, lang);
                
                await page.getByText(nameDelete).click();
                await page.waitForSelector('text=Edit Category');
                await ticketCategoriesCP.editTicketCategoryDeleteTicketCategory.click();
                await page.waitForSelector('text=Are you sure?');
                await expect(ticketCategoriesCP.editTicketCategoryDeleteTicketCategoryAlertTitle).toBeVisible();
                await expect(ticketCategoriesCP.editTicketCategoryDeleteTicketCategoryAlertMessage).toBeVisible();
                await expect(ticketCategoriesCP.editTicketCategoryDeleteTicketCategoryGoBack).toBeVisible();
                await ticketCategoriesCP.editTicketCategoryDeleteTicketCategoryGoBack.click();
            });
            test('should go back to Edit Category', async ({ page }) => {
                const ticketCategoriesCP = new TicketCategoriesCP(page, lang);
                const navigationCP = new NavigationCP(page, lang);
                
                await navigationCP.linkTicketCategories.click();
                await page.waitForSelector('text=New Category');
                
                await page.getByText(nameDelete).first().click();
                await page.waitForSelector('text=Edit Category');
                await ticketCategoriesCP.editTicketCategoryDeleteTicketCategory.click();
                await ticketCategoriesCP.editTicketCategoryDeleteTicketCategoryGoBack.click();
                await page.waitForSelector('text=Edit Category');
                await expect(ticketCategoriesCP.editTicketCategoryDeleteTicketCategoryAlertMessage).not.toBeVisible();
            });
        });
        test.describe('Function', (page) => {
            test('should delete the ticket category', async ({ page }) => {
                const nameDelete = id30char.substring(0, 30);
                const description = 'Test description';
                const ticketCategoriesCP = new TicketCategoriesCP(page, lang);
                
                await page.waitForSelector('text=New Category');
                await ticketCategoriesCP.btnNewCategory.click();
                await page.waitForSelector('text=Create a new Category');
                await ticketCategoriesCP.inputName.fill(nameDelete);
                await ticketCategoriesCP.inputPosition.fill('100');
                await ticketCategoriesCP.inputDescription.fill(description);
                await ticketCategoriesCP.btnSubmit.click();
                await page.waitForSelector('text=New Category');

                const navigationCP = new NavigationCP(page, lang);
                
                await navigationCP.linkTicketCategories.click();
                await page.waitForSelector('text=New Category');
                
                await page.getByText(nameDelete).first().click();
                await page.waitForSelector('text=Edit Category');
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

