import type { Mapper } from '@automapper/core';
import { createMap, forMember, mapFrom } from '@automapper/core';
import {
    AddressDto,
    createAddressDtoMetadata,
    PascalAddressDto,
    SnakeAddressDto,
} from '../dtos/address.dto';
import {
    Address,
    createAddressMetadata,
    PascalAddress,
    SnakeAddress,
} from '../models/address';

export function addressProfile(mapper: Mapper) {
    createAddressMetadata();
    createAddressDtoMetadata();

    createMap<Address, AddressDto>(
        mapper,
        'Address',
        'AddressDto',
        forMember(
            (d) => d.formattedAddress,
            mapFrom((s) => `${s.street} ${s.city} ${s.state}`)
        )
    );

    createMap<Address, PascalAddressDto>(
        mapper,
        'Address',
        'PascalAddressDto',
        forMember(
            (d) => d.FormattedAddress,
            mapFrom((s) => `${s.street} ${s.city} ${s.state}`)
        )
    );

    createMap<Address, SnakeAddressDto>(
        mapper,
        'Address',
        'SnakeAddressDto',
        forMember(
            (d) => d.formatted_address,
            mapFrom((s) => `${s.street} ${s.city} ${s.state}`)
        )
    );
}

export function pascalAddressProfile(mapper: Mapper) {
    createAddressMetadata();
    createAddressDtoMetadata();

    createMap<PascalAddress, AddressDto>(
        mapper,
        'PascalAddress',
        'AddressDto',
        forMember(
            (d) => d.formattedAddress,
            mapFrom((s) => `${s.Street} ${s.City} ${s.State}`)
        )
    );

    createMap<PascalAddress, PascalAddressDto>(
        mapper,
        'PascalAddress',
        'PascalAddressDto',
        forMember(
            (d) => d.FormattedAddress,
            mapFrom((s) => `${s.Street} ${s.City} ${s.State}`)
        )
    );

    createMap<PascalAddress, SnakeAddressDto>(
        mapper,
        'PascalAddress',
        'SnakeAddressDto',
        forMember(
            (d) => d.formatted_address,
            mapFrom((s) => `${s.Street} ${s.City} ${s.State}`)
        )
    );
}

export function snakeAddressProfile(mapper: Mapper) {
    createAddressMetadata();
    createAddressDtoMetadata();

    createMap<SnakeAddress, AddressDto>(
        mapper,
        'SnakeAddress',
        'AddressDto',
        forMember(
            (d) => d.formattedAddress,
            mapFrom((s) => `${s.street} ${s.city} ${s.state}`)
        )
    );

    createMap<SnakeAddress, PascalAddressDto>(
        mapper,
        'SnakeAddress',
        'PascalAddressDto',
        forMember(
            (d) => d.FormattedAddress,
            mapFrom((s) => `${s.street} ${s.city} ${s.state}`)
        )
    );

    createMap<SnakeAddress, SnakeAddressDto>(
        mapper,
        'SnakeAddress',
        'SnakeAddressDto',
        forMember(
            (d) => d.formatted_address,
            mapFrom((s) => `${s.street} ${s.city} ${s.state}`)
        )
    );
}
