import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'

const handler: NextApiHandler = async (req, res) => {
    const { slug } = req.query;
    try {
        if (!slug) {
            return res.status(400).json({ message: '`slug` required' })
        }
        let results = await query(
            `
                SELECT * FROM families
                WHERE slug = ?
            `,
            slug
        )
        if (results && (results as []).length > 0) {
            results = await Promise.all(
                (results as []).map(async(result: { id, social_links_id, image_id }) => {
                    result['image'] = null;
                    result['social_links'] = null;
                    result['artists'] = [];
                    const artistIds = await query(
                        `
                        SELECT artist_id FROM families_artists
                        WHERE family_id = ${result.id} 
                        `
                    )
                    if (artistIds && (artistIds as []).length > 0) {
                        const artists = await Promise.all(
                            (artistIds as []).map(async(artist: { artist_id }) => {
                                const id = artist?.artist_id ? artist.artist_id : null;
                                if (id) {
                                    const artistObj = await query(`
                                        SELECT image_id, slug, name, accent_color  FROM artists
                                        WHERE id = ${artist.artist_id}
                                    `) 
                                    if ((artistObj as []).length > 0 && artistObj[0]?.image_id) {
                                        const image = await query(`
                                            SELECT * FROM images
                                            WHERE id = ${artistObj[0].image_id}
                                        `)
                                        artistObj[0].image = image[0] ? image[0] : null;
                                    }
                                    return artistObj[0];
                                }
                                return null;
                            })
                        )
                        result['artists'] = artists;
                    }
                    if (result.social_links_id) {
                        const socialLinks = await query(`
                            SELECT * FROM social_links
                            WHERE id = ${result.social_links_id}
                        `)
                        result['social_links'] = socialLinks[0] ? socialLinks[0] : null;
                    }
                    if (result.image_id) {
                        const image = await query(`
                            SELECT * FROM images
                            WHERE id = ${result.image_id}
                        `)
                        result['image'] = image[0] ? image[0] : null;
                    }
                    return result;
                })
            )
        }
        res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
