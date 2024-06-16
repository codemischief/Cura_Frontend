import PropTypes from "prop-types";
import {
  useLocation,
  NavLink as RouterLink,
  useSearchParams,
} from "react-router-dom";
import { useRef, useState } from "react";
import { useEffect } from "react";
import {
  Box,
  Link,
  ListItem,
  ListSubheader,
  Paper,
  Stack,
  styled,
} from "@mui/material";
import { navMenuConfig } from "./navbarConfig";
import useAuth from "../../context/JwtContext";

const ListItemStyle = styled(ListItem)(({ theme }) => ({
  ...theme.typography.body2,
  padding: 0,
  marginTop: theme.spacing(3),

  color: "#505050",
  "&:hover": {
    color: "#505050",
    background: "#DAE7FF",
    borderRadius: "0.3125rem",
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
  transition: theme.transitions.create("opacity", {
    duration: theme.transitions.duration.shortest,
  }),
}));
function MenuDesktopItem({
  item,
  pathname,
  isOpen,
  onOpen,
  onClose,
  accessModules,
}) {
  const paperRef = useRef();
  const { title, path, children } = item;

  useEffect(() => {
    let timeoutId;
    const handler = (event) => {
      if (
        isOpen &&
        paperRef.current &&
        !paperRef.current.contains(event.target)
      ) {
        timeoutId = setTimeout(() => {
          onClose();
        }, 200);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
      clearTimeout(timeoutId);
    };
  }, [isOpen]);

  const handleClick = (event, title) => {
    event.preventDefault();
    if (isOpen !== title) {
      onOpen(title);
    }
  };
  const handleSubheaderClick = (path) => {
    if (path) onClose();
  };
  return [
    <LinkStyle
      key={title}
      onClick={(event) => handleClick(event, title)}
      to={"#"}
      component={RouterLink}
      sx={{
        // ...(isHome && { color: "common.white" }),
        // ...(isOffset && { color: "text.primary" }),
        ...(isOpen && isOpen === title && { color: "white" }),
        width: "158px",
        height: "26px",
        padding: "6px 12px",
        textAlign: "center",
        fontFamily: "Open Sans",
        fontSize: "16px",
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: "85.714%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: isOpen && isOpen === title ? "white" : "transparent",
        color: isOpen && isOpen === title ? "blue" : "inherit",
        textDecoration: "none",
        borderRadius: isOpen && isOpen === title && "5px",
        ":hover ": {
          background: "white",
          color: "blue",
          textDecoration: "none",
          borderRadius: "5px",
        },
      }}
    >
      {title}
    </LinkStyle>,
    isOpen && isOpen === title && (
      <Paper
        ref={paperRef}
        elevation={12}
        // Added class to hide scrollbar
        className="no-scrollbar"
        sx={{
          width: "98%",
          position: "absolute",
          padding: title === "Research" ? "28px 10rem" : "28px",
          top: 70,
          left: 18,
          maxHeight: "calc(100vh - 6.8rem)",
          borderRadius: "15px",
          overflowY: "scroll",
          opacity: isOpen === title ? 1 : 0,
          transform: isOpen === title ? "translateY(0)" : "translateY(-4px)",
          transition: "opacity 0.2s ease, transform 0.2s ease",
          minHeight: "205px",
          zIndex: "9",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="w-fit flex justify-center items-center">
          <div
            className={`grid ${
              title === "Research" ? "grid-cols-4" : "grid-cols-5"
            } w-fit`}
            ref={paperRef}
          >
            {children?.map((column) => {
              // const { subheader, items } = list;
              return (
                <div
                  key={`${column}subcol`}
                  className={`w-fit flex flex-col pl-[1rem] ${
                    title === "Research" ? "gap-[2.25rem]" : "gap-[1.25rem]"
                  } border-r border-[#CBCBCB] last:border-none`}
                >
                  {column?.map((list) => {
                    const { subheader, items } = list;

                    return (
                      <div
                        key={subheader}
                        className={`min-w-[14.5rem] w-fit items-start justify-start  flex flex-col gap-2 ${
                          item.length === 0 && "py-[2.25rem]"
                        }`}
                      >
                        <ListSubheader
                          disableSticky
                          disableGutters
                          component={RouterLink}
                          onClick={() => handleSubheaderClick(list.path)}
                          to={
                            list.path
                              ? isResourceAccessible(accessModules, list?.path)
                              : "#"
                          }
                          sx={{
                            fontFamily: "Open Sans",
                            fontSize: "16px",
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
                        </ListSubheader>
                        {items?.map((item) => (
                          <ListItemStyle
                            onClick={onClose}
                            key={item?.title}
                            to={isResourceAccessible(accessModules, item?.path)}
                            component={RouterLink}
                            underline="none"
                            sx={{
                              ...(item?.path === pathname && {
                                typography: "subtitle2",
                                color: "text.primary",
                              }),
                              marginTop: "0px",
                              paddingTop: "8px",
                              fontFamily: "Open Sans",
                              fontSize: "0.725rem",
                              fontStyle: "normal",
                              fontWeight: 400,
                              lineHeight: "150%",
                              pointerEvents: isResourceAccessible(
                                accessModules,
                                item?.path
                              )
                                ? "auto"
                                : "none",
                              opacity: isResourceAccessible(
                                accessModules,
                                item?.path
                              )
                                ? 1
                                : 0.5,
                            }}
                          >
                            <>
                              <div className="px-2">
                                {isResourceAccessible(accessModules, item?.path)
                                  ? item?.title
                                  : `${item.title} (disabled)`}
                              </div>
                            </>
                          </ListItemStyle>
                        ))}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </Paper>
    ),
  ];
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
  isOpen: PropTypes.bool,
  isOffset: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default function MenuDesktop({ isOffset, isHome }) {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(null);
  const handleOpen = (title) => {
    setOpen(title);
  };
  const handleClose = () => {
    setOpen(null);
  };
  let filteredMenu =
    user?.roleId === 1
      ? navMenuConfig
      : navMenuConfig?.filter((item) => item.title !== "Admin");
  return (
    <Stack
      width={"fit-content"}
      height={"39px"}
      direction="row"
      gap={"4px"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {filteredMenu?.map((link) => (
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
          accessModules={user?.allowedModules}
        />
      ))}
    </Stack>
  );
}
MenuDesktop.propTypes = {
  isHome: PropTypes.bool.isRequired,
  isOffset: PropTypes.number,
};

const isResourceAccessible = (modules, pathToCheck) => {
  if (pathToCheck?.includes("reports")) return pathToCheck;
  return modules[pathToCheck] && modules[pathToCheck]?.get ? pathToCheck : null;
};
