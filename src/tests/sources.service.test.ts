import 'mocha';
import { expect } from 'chai';
import {ISourcesServiceContext, SourcesService} from "../services/sources.service";
import {Source} from "../entities/source";
import * as TypeMoq from 'typemoq';
import {ISourceRepo} from "../repos/source.repo";
import {User} from "../entities/user";

describe('SourcesService', () => {

    const sessionUser : User = {
      id: 1,
      username: 'test user',
      passwordHash: 'testpass'
    };

    describe('create', () => {

        it('create new source', async () => {
            const dbSources : Source[] = [];

            const mock : TypeMoq.IMock<ISourceRepo> =
                TypeMoq.Mock.ofType<ISourceRepo>();
            mock.setup(r => r.add(TypeMoq.It.isAny()))
                .callback( ( source : Source ) => {
                    source.id = 1;
                    dbSources.push(source);
                })
                .returns( async (source) : Promise<Source> => {
                    return source;
                })
                .verifiable();

            const context : ISourcesServiceContext = {
                repo: mock.object,
                user: sessionUser
            };
            const service = new SourcesService(context);
            const source : Source = {
                encoding: 'utf8',
                id: 0,
                title: 'Meduza.io',
                url: 'https://meduza.io/',
                userId: null,
                queries: [
                    {
                        relative: false,
                        urlQuery: '.title a',
                        textQuery: null
                    }
                ]
            };
            const actual = await service.create(source);

            expect(actual.id).not.equals(0);
            expect(actual.userId).equals(sessionUser.id);
            mock.verifyAll();
        });

    });

});