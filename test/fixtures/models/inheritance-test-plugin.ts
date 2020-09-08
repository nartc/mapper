export class BaseEntityPlugin {
  id!: string;

  static __NARTC_AUTOMAPPER_METADATA_FACTORY() {
    return {
      id: () => String,
    };
  }
}

// @ts-ignore
export class UserPlugin extends BaseEntityPlugin {
  name!: string;

  static __NARTC_AUTOMAPPER_METADATA_FACTORY() {
    return {
      name: () => String,
    };
  }
}

// @ts-ignore
export class CampusUserPlugin extends UserPlugin {
  campusId!: string;

  static __NARTC_AUTOMAPPER_METADATA_FACTORY() {
    return {
      campusId: () => String,
    };
  }
}

export class ResponseBaseEntityPlugin {
  id!: string;

  static __NARTC_AUTOMAPPER_METADATA_FACTORY() {
    return {
      id: () => String,
    };
  }
}

// @ts-ignore
export class ResponseUserDtoPlugin extends ResponseBaseEntityPlugin {
  name!: string;

  static __NARTC_AUTOMAPPER_METADATA_FACTORY() {
    return {
      name: () => String,
    };
  }
}

// @ts-ignore
export class ResponseCampusUserDtoPlugin extends ResponseUserDtoPlugin {
  campusId!: string;

  static __NARTC_AUTOMAPPER_METADATA_FACTORY() {
    return {
      campusId: () => String,
    };
  }
}
