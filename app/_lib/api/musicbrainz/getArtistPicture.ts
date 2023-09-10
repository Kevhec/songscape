import { MBRelation } from '@/types';

export default function getArtistPicture(relations: MBRelation[]):string | undefined {
  let url;
  // Find image relation
  if (relations) {
    for (let i = 0; i < relations.length; i += 1) {
      if (relations[i].type === 'image') {
        let imageUrl = relations[i]?.url?.resource;
        if (imageUrl?.startsWith('https://commons.wikimedia.org/wiki/File:')) {
          const filename = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
          imageUrl = `https://commons.wikimedia.org/wiki/Special:Redirect/file/${filename}`;
        }
        url = imageUrl;
      }
    }
  }

  return url;
}
