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
                SELECT * FROM artists
                WHERE slug = ?
            `,
            slug
        )
        if (results && (results as []).length > 0) {
            results = await Promise.all((results as []).map(async(result: { id, social_links_id, image_id }) => {
                result['families'] = [];
                result['image'] = null;
                result['social_links'] = null;
                result['artist_types'] = [];
                const familyIds = await query(
                    `
                    SELECT family_id FROM families_artists
                    WHERE artist_id = ${result.id} 
                    `
                )
                const artistTypesIds = await query(`
                    SELECT artist_type_id FROM artists_artist_types
                    WHERE artist_id = ${result.id}
                `)
                if (familyIds && (familyIds as []).length > 0) {
                    const families = await Promise.all((familyIds as []).map(async(familyId: { family_id }) => {
                        const family = await query(`
                            SELECT * FROM families
                            WHERE id = ${familyId.family_id }
                        `)
                        return family[0];
                    }))
                    result['families'] = families;
                }
                if (artistTypesIds && (artistTypesIds as []).length > 0) {
                    const artistTypes = await Promise.all((artistTypesIds as []).map(async(artistTypeId: { artist_type_id }) => {
                        const artistType = await query(`
                            SELECT * FROM artist_types
                            WHERE id = ${artistTypeId.artist_type_id }
                        `)
                        return artistType[0];
                    }))
                    result['artist_types'] = artistTypes;
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
            }))
        }
        res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
