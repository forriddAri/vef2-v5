import HeadingWithAnchorLink from '@/components/HeadingWithAnchorLink';
import ImageBlock, { ImageBlockFragment } from '@/components/blocks/ImageBlock';
import ImageGalleryBlock, {
  ImageGalleryBlockFragment,
} from '@/components/blocks/ImageGalleryBlock';
import { VideoBlockFragment } from '@/components/blocks/VideoBlock';
import { TagFragment } from '@/lib/datocms/commonFragments';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { generateMetadataFn } from '@/lib/datocms/generateMetadataFn';
import { graphql } from '@/lib/datocms/graphql';
import { isCode, isHeading } from 'datocms-structured-text-utils';
import dynamic from 'next/dynamic';
import { draftMode } from 'next/headers';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { StructuredText, renderNodeRule, toNextMetadata } from 'react-datocms';

export const metadata = {
  title: 'Spurningarleikur Ara',
};

const query = graphql(
  /* GraphQL */ `
    query GetQuestions {
      allQuestions {
        id
        questionTitle
        spurning
        flokkur {
          slug
          title
        }
        authors {
          name
        }
        svor {
          ... on AnswerRecord {
            id
            ans
            rett
          }
        }
      }
    }
  `,
  [],
);

/*

*/

export default async function QuestionsPage({ params }: { params: { slug: string } }) {
  const { allQuestions } = await executeQuery(query);

  const filtered = allQuestions.filter((q) => q.flokkur?.slug === params.slug);

  if (filtered.length === 0) {
    notFound();
  }

  return (
    <>
      <h1>Spurningar fyrir flokk: {params.slug}</h1>
      <ul>
        {filtered.map((q) => (
          <li key={q.id}>
            <h2>{q.questionTitle}</h2>
            <p>{q.spurning}</p>
            <ul>
              {q.svor.map((s) => (
                <li key={s.id}>{s.ans}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
}
