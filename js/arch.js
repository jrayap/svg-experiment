class Arch {
  totalValue;
  value;
  completedValue;
  totalValue;
  width;
  strokeWidth;

  width;
  height;
  strokeWidth;
  arch100Percent;

  radius;
  center;
  archInitPoint = {
    x: 0,
    y: 0,
  };
  archEndPoint = {
    x: 0,
    y: 0,
  };

  constructor(width, strokeWidth, arch100Percent) {
    if (!width || !strokeWidth || !arch100Percent) {
      console.error(
        "ERROR: Inputs width, strokeWidth and arch100Percent are mandatory"
      );
    }

    this.width = width;
    this.strokeWidth = strokeWidth;
    this.arch100Percent = arch100Percent;

    this.#calcArch();
  }

  printArch() {
    const archHTML = `<svg
      width="${this.width}"
      height="${this.height}"
      class="progress-arch"
    >
      <defs>
        <linearGradient id="completion-gradient">
          <stop class="progress-arch-color-start" offset="0%" />
          <stop class="progress-arch-color-end" offset="100%" />
        </linearGradient>
      </defs>
      <path
        class="progress-arch-base-path"
        attr.d="M {{ arch.archInitX }} {{ arch.archInitY }}
                  A {{ arch.radius }} {{ arch.radius }} 0 1 1 {{ arch.archEndX }} {{ arch.archEndY }}"
      ></path>
      <path
        class="progress-arch-completion-path"
        attr.stroke-width="{{ arch.strokeWidth }}"
        attr.d="M {{ arch.archInitX }} {{ arch.archInitY }}
                  A {{ arch.radius }} {{ arch.radius }} 0 1 1 {{ arch.archEndX }} {{ arch.archEndY }}"
        attr.stroke-dasharray="{{ arch.arch100Percent }}"
        attr.stroke-dashoffset="{{ arch.archCurrentPercent }}"
      ></path>
      <text
        class="progress-arch-completion-text"
        dominant-baseline="middle"
        x="50%"
        y="50%"
      >
        {{ isDataLoaded() ? calcPercent() : noData }}%
      </text>
    </svg>`;

    return archHTML;
  }

  #calcArch() {
    this.radius = this.width / 2 - this.strokeWidth * 2;
    this.center = this.width / 2;

    const stringCirc = this.radius;
    const arrow =
      this.radius -
      Math.sqrt(Math.pow(this.radius, 2) - Math.pow(stringCirc / 2, 2));

    this.archInitPoint.x = this.radius - stringCirc / 2;
    this.archInitPoint.y = this.width - arrow;

    this.archEndPoint.x = this.radius + stringCirc / 2;
    this.archEndPoint.y = this.width + arrow;
  }
}

/* <svg
        attr.width="{{ arch.width }}"
        attr.height="{{ arch.width }}"
        class="progress-arch"
      >
        <defs>
          <linearGradient id="completion-gradient">
            <stop class="progress-arch-color-start" offset="0%" />
            <stop class="progress-arch-color-end" offset="100%" />
          </linearGradient>
        </defs>
        <path
          class="progress-arch-base-path"
          attr.d="M {{ arch.archInitX }} {{ arch.archInitY }}
                    A {{ arch.radius }} {{ arch.radius }} 0 1 1 {{ arch.archEndX }} {{ arch.archEndY }}"
        ></path>
        <path
          class="progress-arch-completion-path"
          attr.stroke-width="{{ arch.strokeWidth }}"
          attr.d="M {{ arch.archInitX }} {{ arch.archInitY }}
                    A {{ arch.radius }} {{ arch.radius }} 0 1 1 {{ arch.archEndX }} {{ arch.archEndY }}"
          attr.stroke-dasharray="{{ arch.arch100Percent }}"
          attr.stroke-dashoffset="{{ arch.archCurrentPercent }}"
        ></path>
        <text
          class="progress-arch-completion-text"
          dominant-baseline="middle"
          x="50%"
          y="50%"
        >
          {{ isDataLoaded() ? calcPercent() : noData }}%
        </text>
      </svg> */
