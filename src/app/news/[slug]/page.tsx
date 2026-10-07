import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaretDownIcon, CaretUpIcon } from "@phosphor-icons/react/dist/ssr";
import { NEWS, findNews, formatDate } from "@/components/News/data";
import type { NewsItem } from "@/components/News/data";
import styles from "./page.module.scss";

// 빌드할 때 모든 글의 상세 페이지를 미리 만들어 둠
export function generateStaticParams() {
  return NEWS.map((item) => ({ slug: item.slug }));
}

// 브라우저 탭 제목과 검색 결과 설명
export async function generateMetadata({
  params,
}: PageProps<"/news/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const found = findNews(slug);
  if (!found) return {};

  return {
    title: `${found.item.title} | 온결피부과`,
    description: found.item.description,
  };
}

/** 이전 글 · 다음 글 한 줄 */
function PagerRow({
  label,
  icon,
  item,
}: {
  label: string;
  icon: React.ReactNode;
  item: NewsItem | null;
}) {
  return (
    <li className={styles.pagerRow}>
      <span className={styles.pagerLabel}>
        {icon}
        {label}
      </span>

      {item ? (
        <>
          <Link href={`/news/${item.slug}`} className={styles.pagerLink}>
            {item.title}
          </Link>
          <time dateTime={item.date} className={styles.pagerDate}>
            {formatDate(item.date)}
          </time>
        </>
      ) : (
        <span className={styles.pagerEmpty}>{label}이 없습니다.</span>
      )}
    </li>
  );
}

export default async function NewsPage({
  params,
}: PageProps<"/news/[slug]">) {
  const { slug } = await params;
  const found = findNews(slug);

  // 목록에 없는 주소면 404 페이지로
  if (!found) notFound();

  const { item, prev, next } = found;

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        {/* ---------- 현재 위치 ---------- */}
        <nav aria-label="현재 위치">
          <ol className={styles.breadcrumb}>
            <li>
              <Link href="/news">뉴스룸</Link>
            </li>
            <li aria-current="page">{item.category}</li>
          </ol>
        </nav>

        <article>
          {/* ---------- 제목 ---------- */}
          <header className={styles.head}>
            <h1 className={styles.title}>{item.title}</h1>
            <time dateTime={item.date} className={styles.date}>
              {formatDate(item.date)}
            </time>
          </header>

          {/* ---------- 본문 ---------- */}
          <div className={styles.content}>
            <div className={styles.figure}>
              <Image
                src={item.image}
                alt=""
                fill
                sizes="(max-width: 767px) 100vw, 640px"
                placeholder="blur"
                preload
              />
            </div>

            <div className={styles.body}>
              {item.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {item.source && (
              <p className={styles.source}>
                출처 : {item.source.name} (
                <a href={item.source.url} target="_blank" rel="noreferrer">
                  {item.source.url}
                </a>
                )
              </p>
            )}
          </div>
        </article>

        {/* ---------- 이전 글 · 다음 글 ---------- */}
        <nav aria-label="다른 소식">
          <ul className={styles.pager}>
            <PagerRow
              label="이전 글"
              icon={<CaretUpIcon size={14} aria-hidden="true" />}
              item={prev}
            />
            <PagerRow
              label="다음 글"
              icon={<CaretDownIcon size={14} aria-hidden="true" />}
              item={next}
            />
          </ul>
        </nav>

        <div className={styles.actions}>
          <Link href="/news" className={styles.back}>
            목록으로
          </Link>
        </div>
      </div>
    </main>
  );
}