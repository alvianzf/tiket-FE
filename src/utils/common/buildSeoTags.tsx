import { MetaTag } from '@hooks/common/useMetaTags';

const buildTags = ({
	title,
	metaTags = [],
}: {
	title: string;
	metaTags: MetaTag[];
}) => (
	<>
		<title>{title}</title>
		{metaTags.map((metaTag) => (
			<meta key={metaTag.name} {...metaTag} />
		))}
	</>
);

export default buildTags;
