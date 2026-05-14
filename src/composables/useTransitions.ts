import { gsap } from 'gsap'

export function useTransitions() {
  // Grid → Project: zoom in
  function zoomIn(element: HTMLElement, onComplete: () => void) {
    gsap.fromTo(element,
      { scale: 0.95, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
        onComplete
      }
    )
  }

  // Project → Grid: zoom out
  function zoomOut(element: HTMLElement, onComplete: () => void) {
    gsap.fromTo(element,
      { scale: 1, opacity: 1 },
      {
        scale: 0.95,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete
      }
    )
  }

  // Lightbox: fade + scale in
  function lightboxIn(element: HTMLElement) {
    gsap.fromTo(element,
      { scale: 0.92, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.35,
        ease: 'power2.out'
      }
    )
  }

  // Lightbox: fade + scale out
  function lightboxOut(element: HTMLElement, onComplete: () => void) {
    gsap.fromTo(element,
      { scale: 1, opacity: 1 },
      {
        scale: 0.92,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete
      }
    )
  }

  // Grid reorder: fade cards when filter changes
  function fadeCards(elements: HTMLElement[]) {
    gsap.fromTo(elements,
      { opacity: 0, y: 8 },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
        stagger: 0.04
      }
    )
  }

  return {
    zoomIn,
    zoomOut,
    lightboxIn,
    lightboxOut,
    fadeCards
  }
}