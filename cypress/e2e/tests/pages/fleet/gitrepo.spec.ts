import { before, defaults } from "lodash";
import { GitRepoCreatePo } from "~/cypress/e2e/po/pages/fleet/gitrepo-create.po";


describe('Git Repo', { tags: '@adminUser' }, () => {

    beforeEach(() => {
        cy.login();
    });

    describe('Create', () => {
        let gitRepoCreatePage: GitRepoCreatePo;

        beforeEach(() => {

            gitRepoCreatePage = new GitRepoCreatePo('local');

        });
        it('Should be able to create a git repo', () => {

            gitRepoCreatePage.goTo();
            gitRepoCreatePage.setRepoName('fleet-e2e-test');
            gitRepoCreatePage.setGitRepoUrl('https://github.com/Shavindra/fleet-basic.git')
            gitRepoCreatePage.gitRepoPaths().setValueAtIndex('simple', 0);
            gitRepoCreatePage.goToNext();
            gitRepoCreatePage.create();
        });
    });
});