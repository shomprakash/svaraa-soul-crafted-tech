<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project architecture

- Keep `/assets` as an unlisted public brand library with immutable CDN-hosted downloadable masters, so internal collaborators can use stable files without exposing the page in public navigation.
- Keep the homepage story product-first: wearable monitoring and seven modes precede the quieter spiritual rationale, so safety and utility lead the proposition.
- Serve product photography through `PendantPicture` and the generated `src/lib/pendant-images.ts` (CDN WebP sizes plus JPEG fallback, masters kept as unused pointers), so every image is responsive and the originals stay recoverable.
- Homepage copy comes from `src/lib/site-content.ts` defaults merged with overrides in the `site_content` table (edited at the unlisted, password-gated `/update`), so every text block is editable without code and the page still renders if the database read fails. Add new copy as a field there rather than hard-coding it in the route.
