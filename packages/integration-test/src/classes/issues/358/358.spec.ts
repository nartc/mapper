import { classes } from '@automapper/classes';
import {
    addProfile,
    CamelCaseNamingConvention,
    createMapper,
} from '@automapper/core';
import { map, switchMap, take, timer } from 'rxjs';
import {
    AccountDTO,
    AccountEntity,
    accountProfile,
    AccountRole,
} from './account';

describe('Issue 358', () => {
    const mapper = createMapper({
        strategyInitializer: classes(),
        namingConventions: new CamelCaseNamingConvention(),
    });

    afterEach(() => {
        mapper.dispose();
    });

    it('should map array async', (done) => {
        addProfile(mapper, accountProfile);

        getAccounts()
            .pipe(
                switchMap((accounts) =>
                    mapper.mapArrayAsync(accounts, AccountEntity, AccountDTO)
                ),
                take(1)
            )
            .subscribe((dtos) => {
                expect(dtos).toHaveLength(1);
                done();
            });
    });

    it('should map async', (done) => {
        addProfile(mapper, accountProfile);

        getAccount()
            .pipe(
                switchMap((account) =>
                    mapper.mapAsync(account, AccountEntity, AccountDTO)
                ),
                take(1)
            )
            .subscribe((dto) => {
                expect(dto).toBeTruthy();
                done();
            });
    });
});

function getAccounts() {
    const account = makeAccount();
    return timer(500).pipe(map(() => [account]));
}

function getAccount() {
    const account = makeAccount();
    return timer(500).pipe(map(() => account));
}

function makeAccount() {
    const account = new AccountEntity();

    account.id = '123';
    account.email = 'mail';
    account.role = AccountRole.Bar;
    account.posts = ['post'];
    account.topics = ['topic'];
    account.username = 'joe';
    return account;
}
