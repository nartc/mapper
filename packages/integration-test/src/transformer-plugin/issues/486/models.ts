export const createSkillRequestDtoText = `
class CreateSkillRequestDto {
  readonly label: string
  readonly value: string
  readonly categories: string[]
}
`;

export const compiledCreateSkillRequestDto = `class CreateSkillRequestDto {
    label;
    value;
    categories;
    static __AUTOMAPPER_METADATA_FACTORY__() {
        return [
            ["label", { type: () => String, depth: 1 }],
            ["value", { type: () => String, depth: 1 }],
            ["categories", { type: () => [String], depth: 1 }]
        ];
    }
}
`;

export const skillEntityText = `
abstract class QBaseEntity {
  _id: ObjectID
  createdDateTime: Date
  updatedDateTime: Date
  createdBy: any // Can't keep UserEntity here, as it creates circular dependency
  updatedBy: any // Can't keep UserEntity here, as it creates circular dependency
}

class SkillEntity extends QBaseEntity {
  constructor(skill: Partial<SkillEntity>) {
    super()
    Object.assign(this, skill)
  }

  label: string
  value: string
  isDefault: boolean
  status: SkillStatusEnum
  categories: CategoryV2Entity[]
}
`;

export const compiledSkillEntity = `class QBaseEntity {
    _id;
    createdDateTime;
    updatedDateTime;
    createdBy; // Can't keep UserEntity here, as it creates circular dependency
    updatedBy; // Can't keep UserEntity here, as it creates circular dependency
    static __AUTOMAPPER_METADATA_FACTORY__() {
        return [
            ["_id", { type: () => ObjectID, depth: 1 }],
            ["createdDateTime", { type: () => Date, depth: 1 }],
            ["updatedDateTime", { type: () => Date, depth: 1 }]
        ];
    }
}
class SkillEntity extends QBaseEntity {
    constructor(skill) {
        super();
        Object.assign(this, skill);
    }
    label;
    value;
    isDefault;
    status;
    categories;
    static __AUTOMAPPER_METADATA_FACTORY__() {
        return [
            ["label", { type: () => String, depth: 1 }],
            ["value", { type: () => String, depth: 1 }],
            ["isDefault", { type: () => Boolean, depth: 1 }],
            ["status", { type: () => SkillStatusEnum, depth: 1 }],
            ["categories", { type: () => [CategoryV2Entity], depth: 1 }]
        ];
    }
}
`;
