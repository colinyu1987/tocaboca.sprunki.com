import Language from "@/components/locale/list";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { FooterType } from "@/types/landing";

export default function Footer({ footer }: { footer: FooterType }) {
  if (footer.disabled) {
    return null;
  }

  return (
    <section id={footer.name} className="py-20 bg-card/30 border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <footer>
          <div className="flex flex-col items-center justify-between gap-10 text-center lg:flex-row lg:text-left">
            <div className="flex w-full max-w-96 shrink flex-col items-center justify-between gap-6 lg:items-start">
              {footer.brand && (
                <div>
                  <div className="flex items-center justify-center gap-3 lg:justify-start">
                    {footer.brand.logo && (
                      <Image
                        src={footer.brand.logo.src!}
                        alt={footer.brand.logo.alt! || footer.brand.title!}
                        width={40}
                        height={40}
                        className="h-10"
                      />
                    )}
                    {footer.brand.title && (
                      <p className="text-2xl font-bold text-primary">
                        {footer.brand.title}
                      </p>
                    )}
                  </div>
                  {footer.brand.description && (
                    <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                      {footer.brand.description}
                    </p>
                  )}
                  <div className="mt-6 space-y-2">
                    {footer.contact && (
                      <p className="text-sm text-muted-foreground">
                        {footer.contact.label}:{" "}
                        <a
                          href={`mailto:${footer.contact.email}`}
                          className="text-primary hover:text-primary/80 transition-colors"
                        >
                          {footer.contact.email}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
              {footer.nav?.items?.map((item, i) => (
                <div key={i}>
                  <h3 className="mb-4 text-sm font-semibold text-foreground uppercase tracking-wider">{item.title}</h3>
                  <ul className="space-y-3">
                    {item.children?.map((iitem, ii) => (
                      <li key={ii}>
                        <Link 
                          href={iitem.url as any} 
                          target={iitem.target}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {iitem.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          
          {footer.showLocaleList && (
            <div className="mt-12 pt-8 border-t border-border/30">
              <Language />
            </div>
          )}

          <div className="mt-12 flex flex-col justify-between gap-4 border-t border-border/30 pt-8 text-center text-xs text-muted-foreground/70 lg:flex-row lg:items-center lg:text-left">
            {footer.copyright && <p>{footer.copyright}</p>}

            {footer.agreement && (
              <ul className="flex justify-center gap-6 lg:justify-start">
                {footer.agreement.items?.map((item, i) => (
                  <li key={i}>
                    <a 
                      href={item.url} 
                      target={item.target} 
                      rel={item?.rel}
                      className="hover:text-primary transition-colors"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </footer>
      </div>
    </section>
  );
}