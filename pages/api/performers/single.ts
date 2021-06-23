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
                SELECT * FROM performers
                WHERE slug = ?
            `,
            slug
        )
        if (results && (results as []).length > 0) {
            results = await Promise.all((results as []).map(async(result: { id, social_links_id, image_id }) => {
                result['families'] = [];
                result['image'] = null;
                result['social_links'] = null;
                result['performer_types'] = [];
                const familyIds = await query(
                    `
                    SELECT family_id FROM families_performers
                    WHERE performer_id = ${result.id} 
                    `
                )
                const performerTypesIds = await query(`
                    SELECT performer_type_id FROM performers_performer_types
                    WHERE performer_id = ${result.id}
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
                if (performerTypesIds && (performerTypesIds as []).length > 0) {
                    const performerTypes = await Promise.all((performerTypesIds as []).map(async(performerTypeId: { performer_type_id }) => {
                        const performerType = await query(`
                            SELECT * FROM performer_types
                            WHERE id = ${performerTypeId.performer_type_id }
                        `)
                        return performerType[0];
                    }))
                    result['performer_types'] = performerTypes;
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
