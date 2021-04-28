import { Injectable } from '@nestjs/common';
import {ContactEntity} from '../entities/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
// import { RepositoryService } from '@nestjsx/crud/typeorm';
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import { DeleteOneRouteOptions,  UpdateOneRouteOptions, CrudRequest } from '@nestjsx/crud';
import { ContactsGateway } from '../gateways/contacts.gateway';
import { DeepPartial } from 'typeorm';

@Injectable()
export class ContactsService extends TypeOrmCrudService<ContactEntity> {

  constructor(
    @InjectRepository(ContactEntity) repo,
    private contactsGateway: ContactsGateway
  ) {
    super(repo);
  }

  async createOne(data: CrudRequest, params: DeepPartial<ContactEntity>): Promise<ContactEntity> {
    const contact = await super.createOne(data, params);
    this.contactsGateway.contactCreated(contact);
    return contact;
  }

  async updateOne(data: CrudRequest, params: DeepPartial<ContactEntity>): Promise<ContactEntity> {
    const contact = await super.updateOne(data, params);
    this.contactsGateway.contactUpdated(contact);
    return contact;
  }

  async deleteOne(req: CrudRequest): Promise<void | ContactEntity> {
    await super.deleteOne(req);
    this.contactsGateway.contactDeleted(1);
    return undefined;
  }
}
