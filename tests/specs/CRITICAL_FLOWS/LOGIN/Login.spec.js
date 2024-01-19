import { test, expect, chromium } from '@playwright/test';
import { v4 as uuidv4 } from 'uuid';
import {loginDI, createBooking, deleteBooking, deleteEvent, inviteBooking, inviteBusiness, createNotifyEvent, acceptBooking, rejectBooking, standbyBooking, addCourse, removeCourse, blastGroup, removeBlastGroup, blastAll, blastDancers, sendMessage} from '../../../helper/DI/functions.js';
import {loginCS} from '../../../helper/CS/functions.js';
import {DimiDI} from '../../../credentials-DI.json';
import {DimiCS} from '../../../credentials-CS.json';
const fs = require("fs");
const LoginScreenDI = require('../../../screenObjects/English/DI/login.screen.js');

const testUserDI = DimiDI;
const testUserCS = DimiCS;
test.setTimeout(180000);

// TODO: This has to be handled with environment variables (check AdmireMe)
const pageURL = 'https://seashell-app-pkyfy.ondigitalocean.app/';
const lang = "fr"
const languageFile = JSON.parse(fs.readFileSync("tests/i18n/" + lang + ".json"));
const strings = languageFile.screens.login;

test.describe('Login flow - English', (page) => {

    test.beforeEach(async ({ page }) => {
        const loginScreenDI = new LoginScreenDI(page, lang);
        await page.goto(pageURL);
        await loginScreenDI.linkLogo.waitFor({state:"visible"}, {timeout:30000});
        await loginScreenDI.drpLanguage.click();
        await page.selectOption('[name="language"]', lang);
    });

    test.describe('Landing page', (page) => {
        
        test.describe('Check UI elements on landing page', async (page) => {
            const loginScreenDI = new LoginScreenDI(page, lang);
            test('Heading', async ({page}) => {
                const loginScreenDI = new LoginScreenDI(page, lang);
                await expect (loginScreenDI.headingWelcomeAboard).toHaveText(strings.welcome_aboard);
            });
            test('1/2 image', async ({page}) => {
                const loginScreenDI = new LoginScreenDI(page, lang);
                await expect (loginScreenDI.img1_2).toBeVisible({timeout:30000});
            });
            test('textbox Username', async ({page}) => {
                const loginScreenDI = new LoginScreenDI(page, lang);
                await expect (loginScreenDI.textUsername).toBeVisible({timeout:30000});
                await expect (loginScreenDI.textUsername).toHaveText('');
            });
            test('textbox Password', async ({page}) => {
                const loginScreenDI = new LoginScreenDI(page, lang);
                await expect (loginScreenDI.textPassword).toBeVisible({timeout:30000});
                await expect (loginScreenDI.textPassword).toHaveText('');
            });
            test('Login button', async ({page}) => {
                const loginScreenDI = new LoginScreenDI(page, lang);
                await expect (loginScreenDI.btnLogin).toBeVisible({timeout:30000});
            });
            test('Language dropbox', async ({page}) => {
                const loginScreenDI = new LoginScreenDI(page, lang);
                await expect (loginScreenDI.drpLanguage).toBeVisible({timeout:30000});
                await expect (loginScreenDI.drpLanguage).toHaveValue(lang);
            });
        });

        test.describe('Check working elements on landing page', async (page) => {
            const loginScreenDI = new LoginScreenDI(page, lang);
            test('Language dropdown', async ({page}) => {
                const loginScreenDI = new LoginScreenDI(page, lang);
                await loginScreenDI.drpLanguage.click();
                await page.selectOption('[name="language"]', lang);
            });
            test('Logo refresh', async ({page}) => {
                const loginScreenDI = new LoginScreenDI(page, lang);
                await loginScreenDI.textUsername.fill(strings.username_placeholder);
                await loginScreenDI.linkLogo.click();
                await expect (loginScreenDI.textUsername).toHaveText('');
            });
            test.describe('Error labels', async (page) => {
                test.skip('Login button calling error labels', async ({page}) => {
                    const loginScreenDI = new LoginScreenDI(page, lang);
                    await page.waitForLoadState();
                    
                    await loginScreenDI.btnLogin.click({force:true});
                    
                    await expect(page.getByText(strings.error_label_required).first()).toBeVisible();
                    await expect(page.getByText(strings.error_label_required).last()).toBeVisible();
                    await expect(page.getByText(strings.error_label_all_fields)).toBeVisible();
                });

               test.skip('No duplicates of Please fill in all fields', async ({page}) => {
                    const loginScreenDI = new LoginScreenDI(page, lang);
                    await loginScreenDI.btnLogin.click();
                    await loginScreenDI.btnLogin.click();
                    await page.waitForTimeout(1000);
                    await expect(page.getByText(strings.error_label_all_fields)).toHaveCount(1);
                });

                test.skip('Adding text in Username removes error label', async ({page}) => {
                    const loginScreenDI = new LoginScreenDI(page, lang);
                    await loginScreenDI.btnLogin.click();
                    await loginScreenDI.textUsername.fill('Sample text');
                    await expect (page.getByText(strings.error_label_required)).toHaveCount(1);
                    // await expect (page.getByText(strings.error_label_required).first()).not.toBeVisible();
                });

                test.skip('Login after adding text in Username removes error label from Username', async ({page}) => {
                    const loginScreenDI = new LoginScreenDI(page, lang);
                    await loginScreenDI.textUsername.fill('Sample text');
                    await loginScreenDI.btnLogin.click();
                    await expect (loginScreenDI.textUsername).toHaveText('');
                    await expect (page.getByText(strings.error_label_required)).toHaveCount(1);
                    await expect (page.getByText(strings.error_label_all_fields).last()).toBeVisible();
                });

                test.skip('Login after adding text in Password removes error label from Username', async ({page}) => {
                    const loginScreenDI = new LoginScreenDI(page, lang);
                    await loginScreenDI.textPassword.fill('Sample text');
                    await loginScreenDI.btnLogin.click();
                    await expect (loginScreenDI.textPassword).toHaveText('');
                    await expect (page.getByText(strings.error_label_required)).toHaveCount(1);
                    await expect (page.getByText(strings.error_label_all_fields).last()).toBeVisible();
                });

                test('MonacoLGT logo refreshes all fields', async ({page}) => {
                    const loginScreenDI = new LoginScreenDI(page, lang);
                    await loginScreenDI.textUsername.fill('Sample text');
                    await loginScreenDI.textPassword.fill('Sample text');
                    await loginScreenDI.linkLogo.click()
                    await expect (loginScreenDI.textPassword).toHaveText('');
                    await expect (loginScreenDI.textUsername).toHaveText('');
                    await expect (page.getByText(strings.error_label_required).last()).not.toBeVisible();
                    await expect (page.getByText(strings.error_label_required).first()).not.toBeVisible();
                    await expect (page.getByText(strings.error_label_all_fields).last()).not.toBeVisible();
                });

                test('Wrong Username and any password', async ({page}) => {
                    const loginScreenDI = new LoginScreenDI(page, lang);
                    await loginScreenDI.textUsername.fill('Wrong Username');
                    await loginScreenDI.textPassword.fill('Sample text');
                    await loginScreenDI.btnLogin.click();
                    await expect (loginScreenDI.textPassword).toHaveText('');
                    await expect (loginScreenDI.textUsername).toHaveText('');
                    await expect (page.getByText(strings.error_label_failed_login)).toBeVisible();
                });

                test('Correct Username and wrong password', async ({page}) => {
                    const loginScreenDI = new LoginScreenDI(page, lang);
                    await loginScreenDI.textUsername.fill(testUserDI.username);
                    await loginScreenDI.textPassword.fill('Wrong Password');
                    await loginScreenDI.btnLogin.click();
                    await expect (loginScreenDI.textPassword).toHaveText('');
                    await expect (loginScreenDI.textUsername).toHaveText('');
                    await expect (page.getByText(strings.error_label_failed_login)).toBeVisible();
                });

                test('Correct Username and Correct password - Valid Login', async ({page}) => {
                    const loginScreenDI = new LoginScreenDI(page, lang);
                    await loginScreenDI.textUsername.fill(testUserDI.username);
                    await loginScreenDI.textPassword.fill(testUserDI.password);
                    await loginScreenDI.btnLogin.click();
                    await expect (loginScreenDI.headingSelectYourVehicle).toBeVisible()
                });
            });
        });
    });
    test.describe('Select your Vehicle page', (page) => {
        test.beforeEach(async ({ page }) => {
            const loginScreenDI = new LoginScreenDI(page, lang);
            await loginScreenDI.textUsername.fill(testUserDI.username);
            await loginScreenDI.textPassword.fill(testUserDI.password);
            await loginScreenDI.btnLogin.click();
    await page.waitForTimeout(1000);
            await loginScreenDI.headingSelectYourVehicle.waitFor({state:"visible"}, {timeout:30000});
        });

        test.describe('Check UI elements on Select Your Vehicle page', async (page) => {
            const loginScreenDI = new LoginScreenDI(page, lang);
            test('Heading', async ({page}) => {
                const loginScreenDI = new LoginScreenDI(page, lang);
                await expect (loginScreenDI.headingSelectYourVehicle).toHaveText(strings.select_your_vehicle);
            });
            test('1/2 image', async ({page}) => {
                const loginScreenDI = new LoginScreenDI(page, lang);
                await expect (loginScreenDI.img1_2).toBeVisible({timeout:30000});
            });
            test('textbox Mileage', async ({page}) => {
                const loginScreenDI = new LoginScreenDI(page, lang);
                await expect (loginScreenDI.textMileage).toBeVisible({timeout:30000});
                await expect (loginScreenDI.textMileage).toHaveText('');
            });
            test('Select a Vehicle dropbox', async ({page}) => {
                const loginScreenDI = new LoginScreenDI(page, lang);
                await expect (loginScreenDI.drpSelectAVehicle).toBeVisible({timeout:30000});
            });

            test('Select button', async ({page}) => {
                const loginScreenDI = new LoginScreenDI(page, lang);
                await page.waitForTimeout(5000);
                await expect (loginScreenDI.btnSelect).toBeVisible({timeout:30000});
            });
            test('Language dropbox', async ({page}) => {
                const loginScreenDI = new LoginScreenDI(page, lang);
                await expect (loginScreenDI.drpLanguage).toBeVisible({timeout:30000});
                await expect (loginScreenDI.drpLanguage).toHaveValue(lang);
            });
        });

        test.describe('Check working elements on landing page', async (page) => {

            test('Language dropdown', async ({page}) => {
                const loginScreenDI = new LoginScreenDI(page, lang);
                await loginScreenDI.drpLanguage.click();
                await page.selectOption('[name="language"]', lang);
            });

            test('Logo refresh', async ({page}) => {
                const loginScreenDI = new LoginScreenDI(page, lang);
                await loginScreenDI.textMileage.fill('123');
                await loginScreenDI.linkLogo.click();
                await expect (loginScreenDI.textMileage).toHaveText('');
            });
        
            test.describe('Error labels', async (page) => {
                test.skip('Select button calling error labels', async ({page}) => {
                    const loginScreenDI = new LoginScreenDI(page, lang);
                    await page.waitForLoadState();
                    
                    await loginScreenDI.btnSelect.click({force:true});
                    
                    await expect(page.getByText(strings.error_label_required).first()).toBeVisible();
                    await expect(page.getByText(strings.error_label_required).last()).toBeVisible();
                });

                test.skip('Login with empty fields shows Please fill in all fields', async ({page}) => {
                    const loginScreenDI = new LoginScreenDI(page, lang);
                    await page.waitForLoadState();
                    
                    await loginScreenDI.btnSelect.click({force:true});
                    
                    await expect(page.getByText(strings.error_label_all_fields)).toBeVisible();
                });

                test.skip('No duplicates of Please fill in all fields', async ({page}) => {
                    const loginScreenDI = new LoginScreenDI(page, lang);
                    await loginScreenDI.btnSelect.click();
                    await loginScreenDI.btnSelect.click();
                    await page.waitForTimeout(1000);
                    await expect(page.getByText(strings.error_label_all_fields)).toHaveCount(1);
                });

                test.skip('Adding text in Mileage removes error label', async ({page}) => {
                    const loginScreenDI = new LoginScreenDI(page, lang);
                    await loginScreenDI.btnSelect.click();
                    await loginScreenDI.textMileage.fill('111');
                    await expect (page.getByText(strings.error_label_required).last()).not.toBeVisible();
                });

                test.skip('Select after adding text in Mileage removes error label from Mileage', async ({page}) => {
                    const loginScreenDI = new LoginScreenDI(page, lang);
                    await loginScreenDI.textMileage.fill('111');
                    await loginScreenDI.btnSelect.click();
                    await expect (loginScreenDI.textMileage).toHaveText('');
                    await expect (page.getByText(strings.error_label_required)).toHaveCount(1);
                });

                test.skip('Select after selecting a vehicle removes error label from the dropdown', async ({page}) => {
                    const loginScreenDI = new LoginScreenDI(page, lang);
                    await loginScreenDI.drpSelectAVehicle.click();
                    await page.selectOption('[name="transport"]', 'Automation Bus -');
                    await loginScreenDI.btnSelect.click();
                    await expect (page.getByText(strings.error_label_required)).toHaveCount(1);
                    // await expect (loginScreenDI.drpSelectAVehicle).toHaveText('Select a vehicle');
                });

                test.skip('Adding invalid empty field text in Mileage shows error label', async ({page}) => {
                    const loginScreenDI = new LoginScreenDI(page, lang);
                    await loginScreenDI.drpSelectAVehicle.click();
                    await page.selectOption('[name="transport"]', 'Automation Bus -');
                    await loginScreenDI.textMileage.fill('');
                    await loginScreenDI.btnSelect.click();
                    await expect (page.getByText(strings.error_label_required).first()).toBeVisible();
                });

                test('Adding leading space numbers in Mileage field shows error label', async ({page}) => {
                    const loginScreenDI = new LoginScreenDI(page, lang);
                    await loginScreenDI.drpSelectAVehicle.click();
                    await page.selectOption('[name="transport"]', 'Automation Bus -');
                    await loginScreenDI.textMileage.fill(' 123');
                    await loginScreenDI.btnSelect.click();
                    await expect(loginScreenDI.btnSelect).toBeDisabled();
                    // await expect (page.getByText(strings.error_label_required).first()).toBeVisible();
                });

                test('Adding negative numbers in Mileage field shows error label', async ({page}) => {
                    const loginScreenDI = new LoginScreenDI(page, lang);
                    await loginScreenDI.drpSelectAVehicle.click();
                    await page.selectOption('[name="transport"]', 'Automation Bus -');
                    await loginScreenDI.textMileage.fill('-1000');
                    await loginScreenDI.btnSelect.click();
                    await expect(loginScreenDI.btnSelect).toBeDisabled();
                });

                test('MonacoLGT logo refreshes all fields and removes error labels', async ({page}) => {
                    const loginScreenDI = new LoginScreenDI(page, lang);
                    await loginScreenDI.drpSelectAVehicle.click();
                    await page.selectOption('[name="transport"]', 'Automation Bus -');
                    await loginScreenDI.textMileage.fill('995');
                    await loginScreenDI.linkLogo.click()
                    // await expect(loginScreenDI.drpSelectAVehicle).toHaveText('Select a vehicle');
                    await expect (loginScreenDI.textMileage).toHaveText('');
                    await expect (page.getByText(strings.error_label_required).last()).not.toBeVisible();
                    await expect (page.getByText(strings.error_label_required).first()).not.toBeVisible();
                });

                test('Inputting lower mileage than the last recorded shows error label', async ({page}) => {
                    const loginScreenDI = new LoginScreenDI(page, lang);
                    await loginScreenDI.drpSelectAVehicle.click();
                    await page.selectOption('[name="transport"]', 'Automation Bus -');
                    await loginScreenDI.textMileage.fill('111');
                    await loginScreenDI.btnSelect.click();
                    // await expect(loginScreenDI.drpSelectAVehicle).toHaveAttribute('Select a vehicle');
                    await expect (loginScreenDI.textMileage).toHaveText('');
                    await expect (page.getByText(strings.error_label_wrong_mileage)).toBeVisible();
                });

                test('Inputting higher mileage than the last recorded shows error label', async ({page}) => {
                    const loginScreenDI = new LoginScreenDI(page, lang);
                    await loginScreenDI.drpSelectAVehicle.click();
                    await page.selectOption('[name="transport"]', 'Automation Bus -');
                    await loginScreenDI.textMileage.fill('1000');
                    await loginScreenDI.btnSelect.click();
                    await expect (loginScreenDI.headingSelectYourVehicle).not.toBeVisible()
                });
            });
        });
    });
});

