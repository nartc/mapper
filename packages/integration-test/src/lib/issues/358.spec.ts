import { setupClasses } from '../setup.spec';
import { accountProfile } from './profiles/account.profile';
import { mapTo, switchMap, take, timer } from 'rxjs';
import { AccountDTO, AccountEntity, AccountRole } from './models/account';

describe('Issue 358', () => {
  const [mapper] = setupClasses('issue-358');

  afterEach(() => {
    mapper.dispose();
  });

  it('should mapArrayAsync', (done) => {
    mapper.addProfile(accountProfile);

    getAccounts()
      .pipe(
        switchMap((accounts) => {
          return mapper.mapArrayAsync(accounts, AccountDTO, AccountEntity);
        }),
        take(1)
      )
      .subscribe((dtos) => {
        expect(dtos.length).toEqual(1);
        done();
      });
  });

  it('should mapAsync', (done) => {
    mapper.addProfile(accountProfile);

    getAccount()
      .pipe(
        switchMap((account) => {
          return mapper.mapAsync(account, AccountDTO, AccountEntity);
        }),
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
  return timer(500).pipe(mapTo([account]));
}

function getAccount() {
  const account = makeAccount();
  return timer(500).pipe(mapTo(account));
}

function makeAccount() {
  const account = new AccountEntity();

  account.id = '123';
  account.email = 'mail';
  account.role = AccountRole.Bar;
  account.posts = ['post'];
  account.topics = ['topic'];
  account.password = 'Libero quis dolor pharetra lacus platea nibh';
  account.username = 'joe';
  return account;
}
