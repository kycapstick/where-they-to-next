
import TextInput from '@/components/text-input';
import Textarea from '@/components/textarea';

export default function Tips({ tips, setTips, tipsLink, setTipsLink }) {
    return (
        <div className="mt-8">
            <h2 className="text-center h3">Tips</h2>
            <p className="text-center">You can add information about how people can send you a tip. If there is a direct link you can add it as a tips link.</p>
            <div className="mt-6">
                <Textarea 
                    name="tips"
                    label="Tips"
                    value={tips}
                    onChange={setTips}
                />
                <TextInput 
                    name="tips_link"
                    label="Tips Link"
                    value={tipsLink}
                    onChange={setTipsLink}
                />
            </div>
        </div>
    )
}