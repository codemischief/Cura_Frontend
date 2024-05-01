import PropTypes from "prop-types";
import {
  useLocation,
  NavLink as RouterLink,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { navMenuConfig } from "./navbarConfig";
import { useRef, useState } from "react";
import { useEffect } from "react";
import {
  Box,
  Grid,
  Icon,
  Link,
  List,
  ListItem,
  ListSubheader,
  Paper,
  Popover,
  Stack,
  styled,
} from "@mui/material";

const VerticalBorder = styled("div")({
  width: "1px",
  height: "182.37px",
  backgroundColor: "#CBCBCB",
});

const ListItemStyle = styled(ListItem)(({ theme }) => ({
  ...theme.typography.body2,
  padding: 0,
  marginTop: theme.spacing(3),
  color: theme.palette.text.secondary,
  transition: theme.transitions.create("color"),
  "&:hover": {
    color: "red",
  },
}));

function IconBullet({ type = "item" }) {
  return (
    <Box sx={{ width: 24, height: 16, display: "flex", alignItems: "center" }}>
      <Box
        component="span"
        sx={{
          ml: "2px",
          width: 4,
          height: 4,
          borderRadius: "50%",
          bgcolor: "currentColor",
          ...(type !== "item" && {
            ml: 0,
            width: 8,
            height: 2,
            borderRadius: 2,
          }),
        }}
      />
    </Box>
  );
}
IconBullet.propTypes = {
  type: PropTypes.string,
};

const LinkStyle = styled(Link)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.common.white,
  marginRight: theme.spacing(5),
  transition: theme.transitions.create("opacity", {
    duration: theme.transitions.duration.shortest,
  }),
  // "&:hover": {
  //   opacity: 0.48,
  //   textDecoration: "none",
  // },
}));

function MenuDesktopItem({
  item,
  pathname,
  isHome,
  isOpen,
  isOffset,
  onOpen,
  onClose,
  activeTab,
}) {
  const paperRef = useRef();
  const { title, path, children } = item;

  const isActive = pathname === path;
  const extraContainers =
    children?.length % 15 === 0 ? 0 : 15 - (children?.length % 15);
  useEffect(() => {
    const handler = (event) => {
      if (
        isOpen &&
        paperRef.current &&
        !paperRef.current.contains(event.target)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [isOpen]);
  return (
    // <div
    //   onClick={() => onOpen(title)}
    //   className={`w-[73px] h-[26px] flex items-center justify-center rounded-[5px] hover:bg-white hover:text-blue-800 active:bg-white active:text-blue-800 `}
    // >
    //   {title}
    // </div>

    <>
      <LinkStyle
        key={title}
        onClick={() => onOpen(title)}
        to={"#"}
        component={RouterLink}
        sx={{
          // ...(isHome && { color: "common.white" }),
          // ...(isOffset && { color: "text.primary" }),
          ...(isOpen && isOpen === title && { color: "white" }),
        }}
      >
        {title}
      </LinkStyle>
      {isOpen && isOpen === title && (
        // <Popover
        //   open={isOpen === title }
        //   anchorReference="anchorPosition"
        //   anchorPosition={{ top: 90, left: 0 }}
        //   anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        //   transformOrigin={{ vertical: "top", horizontal: "center" }}
        //   onClose={onClose}
        //   slotProps={{
        //     paper: {
        //       sx: {
        //         px: 3,
        //         pt: 5,
        //         pb: 3,
        //         right: 16,
        //         m: "auto",
        //         borderRadius: "15px",
        //         maxHeight: "657px",
        //         // maxWidth: (theme) => theme.breakpoints.values.lg,
        //         // boxShadow: (theme) => theme.customShadows.z24,
        //       },
        //     },
        //   }}
        // >
        <Paper
          ref={paperRef}
          // onMouseEnter={handleOpen}

          // onMouseLeave={onClose}
          elevation={12}
          sx={{
            mx: "18px",
            my: "6px",
            width: "100%",
            position: "absolute",
            top: 90,
            left: 0,
            maxHeight: "300px",
            borderRadius: "15px",
            overflowY: "scroll",
            // zIndex: (theme) => theme.zIndex.modal,
            // boxShadow: (theme) => theme.customShadows.z20,
          }}
        >
          {/* <Grid container spacing={3}> */}
          <div className="grid grid-cols-5 w-full gap-x-[18px]" ref={paperRef}>
            {children?.map((list) => {
              const { subheader, items } = list;
              return (
                // <Grid
                //   key={subheader}
                //   item
                //   xs={12}
                //   md={subheader === "Dashboard" ? 6 : 2}
                // >
                <div
                  key={subheader}
                  className={`w-full border-r border-[#CBCBCB]`}
                >
                  <List disablePadding>
                    <ListSubheader
                      disableSticky
                      disableGutters
                      sx={{
                        fontFamily: "Open Sans",
                        fontSize: "18px",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "135%",
                        color: "#282828",
                        position: "relative", // Ensure positioning context for the pseudo-element
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          width: "109.464px",
                          height: "2px",
                          backgroundColor: "#004DD7",
                          opacity: 0, // Initially hidden
                          transition: "opacity 0.3s ease", // Smooth transition
                        },
                        "&:hover::after": {
                          opacity: 1, // Show underline on hover
                        },
                      }}
                    >
                      {subheader}
                      {/* <IconBullet type="subheader" /> {subheader} */}
                    </ListSubheader>

                    {items?.map((item) => (
                      <ListItemStyle
                        onClick={onClose}
                        key={item.title}
                        to={item.path}
                        component={RouterLink}
                        underline="none"
                        sx={{
                          ...(item.path === pathname && {
                            typography: "subtitle2",
                            color: "text.primary",
                          }),
                        }}
                      >
                        <>
                          {/* <IconBullet /> */}
                          {item.title}
                        </>
                      </ListItemStyle>
                    ))}
                  </List>
                </div>

                // </Grid>
              );
            })}
            {Array.from(
              { length: extraContainers },
              (_, index) => index + 1
            ).map((extraHeader) => (
              <div
                key={extraHeader}
                className={`w-full border-r border-[#CBCBCB]`}
              >
                <List disablePadding>
                  <ListSubheader
                    disableSticky
                    disableGutters
                    sx={{
                      fontFamily: "Open Sans",
                      fontSize: "18px",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "135%",
                      color: "#282828",
                      position: "relative", // Ensure positioning context for the pseudo-element
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "109.464px",
                        height: "2px",
                        backgroundColor: "#004DD7",
                        opacity: 0, // Initially hidden
                        transition: "opacity 0.3s ease", // Smooth transition
                      },
                      "&:hover::after": {
                        opacity: 1, // Show underline on hover
                      },
                    }}
                  />
                </List>
              </div>
            ))}
          </div>
          {/* </Grid> */}
          {/* </Popover> */}
        </Paper>
      )}
    </>
  );
}

MenuDesktopItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    path: PropTypes.string,
    children: PropTypes.arrayOf(
      PropTypes.shape({
        subheader: PropTypes.string.isRequired,
        path: PropTypes.string,
      })
    ),
  }).isRequired,
  pathname: PropTypes.string.isRequired,
  activeTab: PropTypes.bool.isRequired,
  isHome: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isOffset: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default function MenuDesktop({ isOffset, isHome }) {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(null);

  // useEffect(() => {
  //   if (open) {
  //     handleClose();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [pathname]);

  const handleOpen = (title) => {
    // setOpen((prev) => ({ ...prev, [title]: true }));
    setOpen(title);
  };

  const handleClose = () => {
    setOpen(null);
  };
  useEffect(() => {
    console.log("open", open);
  }, [open]);
  return (
    <Stack direction="row" justifyContent={"center"} alignItems={"center"}>
      {navMenuConfig?.map((link) => (
        <MenuDesktopItem
          key={link.title}
          item={link}
          pathname={pathname}
          activeTab={searchParams.get("current") === link.title}
          isOpen={open}
          onOpen={handleOpen}
          onClose={handleClose}
          isOffset={isOffset}
          isHome={isHome}
        />
      ))}
    </Stack>
  );
}

MenuDesktop.propTypes = {
  isHome: PropTypes.bool.isRequired,
  isOffset: PropTypes.bool.isRequired,
};
