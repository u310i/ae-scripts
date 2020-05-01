const struct: $T.Struct.Struct = {
  compData: {
    width: 1280,
    height: 720,
    backgroundColor: [0, 0, 0]
  },
  startBlank: 1,
  endBlank: 3,
  fade: {
    in: {
      duration: 2
    },
    out: {
      duration: 2
    }
  },
  parts: [
    {
      project: "simple",
      startBlank: 2,
      cuts: [
        {
          name: "start",
          replace: {
            images: [{ name: "0005.jpg" }]
          },
          startBlank: 0.5
        },
        {
          name: "short",
          replace: {
            images: [{ name: "0012.jpg" }, { name: "0013.jpg" }]
          },
          startBlank: -1,
          fade: {
            in: {
              duration: 1
            }
          }
        },
        {
          name: "long",
          replace: {
            images: [{ name: "0012.jpg" }, { name: "0013.jpg" }]
          }
        },
        {
          name: "end",
          replace: {
            images: [{ name: "0006.jpg" }]
          }
        }
      ]
    },
    {
      project: "simple",
      startBlank: -1.5,
      fade: {
        in: {
          duration: 1.5
        },
        out: {
          duration: 2
        }
      },
      cuts: [
        {
          name: "long",
          replace: {
            images: [{ name: "0005.jpg" }, { name: "0006.jpg" }]
          }
        },
        {
          name: "long",
          replace: {
            images: [{ name: "0007.jpg" }, { name: "0008.jpg" }]
          }
        },
        {
          name: "short",
          replace: {
            images: [{ name: "0009.jpg" }, { name: "0010.jpg" }]
          }
        }
      ]
    }
  ]
};

export default struct;
