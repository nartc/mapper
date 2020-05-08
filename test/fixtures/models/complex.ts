import { AutoMap } from '../../../src/decorators';

export class AuthRRNm {
  @AutoMap()
  updataDate!: Date | null;

  @AutoMap()
  resourceId!: number;

  @AutoMap()
  roleId!: number;

  @AutoMap(() => AuthGroup)
  authGroup!: AuthGroup;

  @AutoMap(() => AuthResource)
  authResource!: AuthResource;
}

export class AuthGroup {
  @AutoMap()
  foo!: string;
}

export class AuthResource {
  @AutoMap()
  updateDate!: Date | null;

  @AutoMap()
  refResourceId!: number | null;

  @AutoMap()
  description!: string | null;

  @AutoMap()
  name!: string | null;

  @AutoMap()
  id!: number;
}

export class AuthUserGroupNm {
  @AutoMap()
  updataDate!: Date | null;

  @AutoMap()
  groupId!: number;

  @AutoMap()
  userId!: number;

  @AutoMap(() => AuthGroup)
  authGroup!: AuthGroup;
}

export class AuthUser {
  @AutoMap()
  soHieu!: string | null;

  @AutoMap()
  ghiChu!: string | null;

  @AutoMap()
  dienThoaiDd!: string | null;

  @AutoMap()
  ngaySua!: Date | null;

  @AutoMap()
  nguoiSuaId!: number | null;

  @AutoMap()
  ngayTao!: Date | null;

  @AutoMap()
  nguoiTaoId!: number | null;

  @AutoMap()
  donViCapTrenId!: number | null;

  @AutoMap()
  donViCsgtId!: number | null;

  @AutoMap()
  macanbo!: string | null;

  @AutoMap()
  entryDate!: Date | null;

  @AutoMap()
  usersId!: string | null;

  @AutoMap()
  description!: string | null;

  @AutoMap()
  status!: string | null;

  @AutoMap()
  validToDate!: Date | null;

  @AutoMap()
  validFromDate!: Date | null;

  @AutoMap()
  emailId!: string | null;

  @AutoMap()
  phoneNumber!: string | null;

  @AutoMap()
  organisation!: string | null;

  @AutoMap()
  department!: string | null;

  @AutoMap()
  password!: string | null;

  @AutoMap()
  userName!: string | null;

  @AutoMap()
  loginId!: string | null;

  @AutoMap()
  id!: number;

  @AutoMap()
  chucVuId!: number | null;

  @AutoMap()
  capBacId!: number | null;

  @AutoMap(() => AuthUserGroupNm)
  authUserGroupNm!: AuthUserGroupNm;
}
