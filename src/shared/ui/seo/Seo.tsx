import { Head } from 'vite-react-ssg'
import { site } from '@/shared/config'

type SeoProps = {
  title: string
  description: string
  path?: string
  noindex?: boolean
}

export function Seo({ title, description, path = '/', noindex = false }: SeoProps) {
  const url = site.url + path

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex" />}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
    </Head>
  )
}
