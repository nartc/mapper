export class NoMetadataBar {
  bar: string;
}

export class NoMetadataFoo {
  foo: string;
  bar: NoMetadataBar;
}

export class NoMetadataBarDto {
  bar: string;
}

export class NoMetadataFooDto {
  foo: string;
  bar: NoMetadataBarDto;
}
