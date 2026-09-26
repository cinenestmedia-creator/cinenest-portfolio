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

- Keep portfolio media in the typed `src/lib/portfolio-data.ts` catalogue and render it through reusable category/video components, so clip counts, order, orientation, and providers stay editable without duplicating markup.
- Load provider players only inside the open video dialog and keep local thumbnail pointers in `src/assets/portfolio/`, so a growing video collection remains lightweight.
