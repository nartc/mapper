import { AutoMap, getMetadataList } from '@automapper/classes';

// Guards inheritance: the @AutoMap decorator now pushes onto the class's OWN metadata
// list (O(1)) and seeds a subclass from inherited metadata via slice(). This
// must NOT mutate the parent's metadata, and a subclass must keep parent members.
describe('@AutoMap inheritance (own-list push + sliced seed)', () => {
    class Parent {
        @AutoMap(() => String) a!: string;
        @AutoMap(() => String) b!: string;
    }
    class Child extends Parent {
        @AutoMap(() => String) c!: string;
    }
    class ChildNoDecl extends Parent {}

    const keys = (model: object) =>
        getMetadataList(model as never)[0].map(([key]) => key);

    it('parent exposes only its own members', () => {
        expect(keys(Parent)).toEqual(['a', 'b']);
    });

    it('subclass keeps parent members and appends its own', () => {
        expect(keys(Child)).toEqual(['a', 'b', 'c']);
    });

    it('subclass with no own decorators inherits parent members', () => {
        expect(keys(ChildNoDecl)).toEqual(['a', 'b']);
    });

    it('decorating the subclass did not mutate the parent', () => {
        // re-read parent after Child/ChildNoDecl were defined+decorated
        expect(keys(Parent)).toEqual(['a', 'b']);
    });
});
