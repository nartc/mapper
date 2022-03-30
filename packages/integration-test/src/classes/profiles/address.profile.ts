import type { Mapper } from '@automapper/core';
import { createMap, forMember, mapFrom } from '@automapper/core';
import {
    AddressDto,
    PascalAddressDto,
    SnakeAddressDto,
} from '../dtos/address.dto';
import { Address, PascalAddress, SnakeAddress } from '../models/address';

export function addressProfile(mapper: Mapper) {
    createMap(
        mapper,
        Address,
        AddressDto,
        forMember(
            (d) => d.formattedAddress,
            mapFrom((s) => `${s.street} ${s.city} ${s.state}`)
        )
    );

    createMap(
        mapper,
        Address,
        PascalAddressDto,
        forMember(
            (d) => d.FormattedAddress,
            mapFrom((s) => `${s.street} ${s.city} ${s.state}`)
        )
    );

    createMap(
        mapper,
        Address,
        SnakeAddressDto,
        forMember(
            (d) => d.formatted_address,
            mapFrom((s) => `${s.street} ${s.city} ${s.state}`)
        )
    );
}

export function pascalAddressProfile(mapper: Mapper) {
    createMap(
        mapper,
        PascalAddress,
        AddressDto,
        forMember(
            (d) => d.formattedAddress,
            mapFrom((s) => `${s.Street} ${s.City} ${s.State}`)
        )
    );

    createMap(
        mapper,
        PascalAddress,
        PascalAddressDto,
        forMember(
            (d) => d.FormattedAddress,
            mapFrom((s) => `${s.Street} ${s.City} ${s.State}`)
        )
    );

    createMap(
        mapper,
        PascalAddress,
        SnakeAddressDto,
        forMember(
            (d) => d.formatted_address,
            mapFrom((s) => `${s.Street} ${s.City} ${s.State}`)
        )
    );
}

export function snakeAddressProfile(mapper: Mapper) {
    createMap(
        mapper,
        SnakeAddress,
        AddressDto,
        forMember(
            (d) => d.formattedAddress,
            mapFrom((s) => `${s.street} ${s.city} ${s.state}`)
        )
    );

    createMap(
        mapper,
        SnakeAddress,
        PascalAddressDto,
        forMember(
            (d) => d.FormattedAddress,
            mapFrom((s) => `${s.street} ${s.city} ${s.state}`)
        )
    );

    createMap(
        mapper,
        SnakeAddress,
        SnakeAddressDto,
        forMember(
            (d) => d.formatted_address,
            mapFrom((s) => `${s.street} ${s.city} ${s.state}`)
        )
    );
}
