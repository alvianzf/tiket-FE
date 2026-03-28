import { MetaTag } from '@hooks/common/useMetaTags';

const buildTags = ({
	title,
	metaTags = [],
	canonical,
}: {
	title: string;
	metaTags: MetaTag[];
	canonical?: string;
}) => (
	<>
		<title>{title}</title>
		{canonical && <link rel="canonical" href={canonical} />}
		{metaTags.map((metaTag) => {
			if (metaTag.property) {
				return <meta key={metaTag.property} property={metaTag.property} content={metaTag.content} />;
			}
			return <meta key={metaTag.name} name={metaTag.name} content={metaTag.content} />;
		})}
	</>
);

export default buildTags;
