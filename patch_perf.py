import re
with open('src/components/preview/InvitationPreview.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Replace static imports with React.lazy
text = text.replace(
    "import StoryArea from './sections/StoryArea';",
    "const StoryArea = React.lazy(() => import('./sections/StoryArea'));"
)
text = text.replace(
    "import GalleryArea from './sections/GalleryArea';",
    "const GalleryArea = React.lazy(() => import('./sections/GalleryArea'));"
)
text = text.replace(
    "import LocationArea from './sections/LocationArea';",
    "const LocationArea = React.lazy(() => import('./sections/LocationArea'));"
)
text = text.replace(
    "import AccountArea from './sections/AccountArea';",
    "const AccountArea = React.lazy(() => import('./sections/AccountArea'));"
)
text = text.replace(
    "import GuestbookArea from './sections/GuestbookArea';",
    "const GuestbookArea = React.lazy(() => import('./sections/GuestbookArea'));"
)
text = text.replace(
    "import RsvpArea from './sections/RsvpArea';",
    "const RsvpArea = React.lazy(() => import('./sections/RsvpArea'));"
)
text = text.replace(
    "import RsvpEmphasis from './sections/RsvpEmphasis';",
    "const RsvpEmphasis = React.lazy(() => import('./sections/RsvpEmphasis'));"
)
text = text.replace(
    "import ShareArea from './sections/ShareArea';",
    "const ShareArea = React.lazy(() => import('./sections/ShareArea'));"
)

# 2. Wrap the orderedSections map inside React.Suspense
suspense_wrapper = """        <React.Suspense fallback={<div style={{ minHeight: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: '20px', height: '20px', border: '2px solid #eaeaea', borderTop: '2px solid #666', borderRadius: '50%', animation: 'spin-small 1s linear infinite' }} /></div>}>
          {(() => {
            switch (sectionId) {"""
text = text.replace("{(() => {\n            switch (sectionId) {", suspense_wrapper)

suspense_end = """              default: return null;
            }
          })()}
        </React.Suspense>"""
text = text.replace("""              default: return null;
            }
          })()""", suspense_end)

# 3. Add preload="none" or "metadata" to audio
text = text.replace(
    "<audio \n              ref={audioRef}",
    "<audio preload=\"metadata\"\n              ref={audioRef}"
)

with open('src/components/preview/InvitationPreview.jsx', 'w', encoding='utf-8') as f:
    f.write(text)
