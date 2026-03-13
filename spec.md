# Saanjh Fragrance Store

## Current State
A luxury perfume store with dark gold theme, hero section, product cards with WhatsApp ordering, owner section, reviews, trust badges, animations.

## Requested Changes (Diff)

### Add
- Loading screen: 'SAANJH' gold text entrance + animated loading bar (luxury brand feel)
- Ambassador/hero image (new upload: /assets/uploads/Saanjh-Store-Extra_7611526269569797399-Slide0-1-1.jpeg) in 4 places:
  1. Hero full-screen background
  2. Ambassador section: large photo + corner gold frames + glow
  3. Gallery first tile (large)
  4. Ambassador section blurred background
- Hover swap images per perfume with existing store images
- Realistic reviews: 4.8/5 rating, bars 83/11/4/1/1%, one 3-star review, Verified Purchase badges, Urdu/English mix
- Promotional popup: 1-hour countdown timer (01:00:00), gold shimmer top bar, 3 benefit checkmarks, skip option
- 8 'Why Saanjh' trust cards
- Custom gold cursor with hover ring effect
- Scroll reveal animations on all elements

### Modify
- Hero: use ambassador image as full-screen background
- Reviews section: replace with new realistic ones

### Remove
- Nothing

## Implementation Plan
1. LoadingScreen component: gold SAANJH text + progress bar
2. Popup with countdown timer from 01:00:00
3. Hero full-screen background with ambassador image
4. Ambassador section with gold frames + glow + blurred bg
5. Perfume card hover swap
6. Reviews rewrite with 4.8/5, realistic bars, Urdu/English
7. 8 Why Saanjh trust cards
8. Custom gold cursor CSS
9. Scroll reveal via IntersectionObserver
10. Gallery tile with ambassador photo
