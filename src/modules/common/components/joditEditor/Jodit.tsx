import JoditEditor from 'jodit-react';
import React, { memo, useEffect, useMemo, useRef, useState } from 'react';

function Jodit({ placeholder, setValues, paramName, field }: any) {
    const editor = useRef(null);
    const [content, setContent] = useState(field.value);

    const config = useMemo(
        () => ({
            readonly: false, // all options from https://xdsoft.net/jodit/doc/,
            placeholder: placeholder || 'Start typings...',
        }),
        [placeholder],
    );

    useEffect(() => {
        setValues((prev: any) => ({ ...prev, [paramName]: content }));
    }, [content]);
    return (
        <JoditEditor
            ref={editor}
            value={content}
            config={config}
            // tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => {}}
        />
    );
}

export default memo(Jodit);
