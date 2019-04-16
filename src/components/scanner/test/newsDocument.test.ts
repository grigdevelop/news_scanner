import 'mocha';
import { expect } from 'chai';
import {NewsDocument, NewsLink, NewsSource} from "../lib";
import {JSDOM} from "jsdom";
import axios, { AxiosResponse} from 'axios';


describe("NewsDocument tests", () => {

    describe("getAllNewsLinks tests", () => {

        const normalHtml = `<div class="all-news">
<div class="one-news-item">
    <a href="good_href" class="news-link">
    One good news
</a>
</div>
<div class="one-news-item">
    <a href="bad_href" class="news-link">
    One bad news
</a>
</div>
<div class="one-news-item">
    <a href="normal_href" class="news-link">
    One normal news
</a>
</div>
</div>`;


        it('should get all news links', async () => {

            const source : NewsSource = {
              url: 'https://anysource.com/',
              id: 1,
              queries: [
                  {relative: false,textQuery: null, urlQuery: '.all-news .one-news-item a.news-link'}
              ],
                encoding: 'utf8'
            };

            const document = await NewsDocument.loadAsync(source, normalHtml);
            const links : NewsLink[] = await document.getAllNewsLinks();
            expect(links.length).to.be.equals(3);
            expect(links.find(x => x.url == 'good_href')).to.be.not.null;
            expect(links[0].sourceUrl).to.be.equals(source.url);
            expect(links[1].sourceId).to.be.equals(source.id);
        });

        it('no links found', async () => {

            const source : NewsSource = {
                url: 'https://anysource.com/',
                id: 1,
                queries: [
                    {relative: false,textQuery: null, urlQuery: '.all-news .one-news-item a.news-link-n'}
                ],
                encoding: 'utf8'
            };

            const document = await NewsDocument.loadAsync(source, normalHtml);
            const links: NewsLink[] = await document.getAllNewsLinks();

            expect(links).to.be.empty;
        });

        it('should download page', async () => {

            const htmlBuffer : AxiosResponse<ArrayBuffer>  = await axios.get<ArrayBuffer>('https://meduza.io/', {
                responseType: 'arraybuffer'
            });


            const dom = new JSDOM(htmlBuffer.data, {
                url: 'https://meduza.io/'
            });
            const result = dom.window.document.querySelectorAll('a.Link-root');
            const temp = 1;
        });

    });



});