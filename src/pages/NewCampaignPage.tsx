import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Flex,
  HStack,
  VStack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Divider,
  Icon,
  Input as CInput,
  Select,
} from '@chakra-ui/react';
import {
  Button,
  IconButton,
  SearchInput,
  Menu,
  MenuItem,
  Input,
  DropdownSingle,
  ArrowBack,
  Plus,
  Download,
  ImportXlsx,
  Info,
  More,
  Attention,
  Users,
  Dashboard,
  Chat,
  Email,
  Customers,
  Settings,
  Analytics,
  SMSCampaign,
  Schedule,
  Responses,
  Projects,
  Filter,
  ReputationManagment,
  Link as LinkIcon,
  Devices,
  DatePicker,
  Checkbox,
  Radio,
  ChevronUp,
  ChevronDown,
  SetTime,
} from '@radiant/common/ui';

// ─── Nav icons ────────────────────────────────────────────────────────────────

const NAV_ICONS = [
  { icon: Dashboard, label: 'Dashboard' },
  { icon: Chat, label: 'Chat' },
  { icon: Analytics, label: 'AI' },
  { icon: Filter, label: 'Filter' },
  { icon: Projects, label: 'Projects' },
  { icon: Email, label: 'Email' },
  { icon: Customers, label: 'Customers' },
  { icon: SMSCampaign, label: 'Campaign' },
  { icon: Responses, label: 'Responses' },
  { icon: Schedule, label: 'Schedule' },
  { icon: ReputationManagment, label: 'Reputation' },
  { icon: Analytics, label: 'Analytics' },
  { icon: Settings, label: 'Settings' },
];

// ─── Stepper steps ────────────────────────────────────────────────────────────

const STEPS = [
  'Select recipient',
  'Compose your message',
  'Schedule',
  'Review & send',
];

// ─── Types ────────────────────────────────────────────────────────────────────

type Recipient = {
  id: number;
  name: string;
  email: string;
  mobileWarning: boolean;
  balance: string;
  language: string;
};

const MOCK_RECIPIENTS: Recipient[] = [
  {
    id: 1,
    name: 'Michel Jamati',
    email: 'michel@lexop.com',
    mobileWarning: true,
    balance: '$2617.00',
    language: 'EN',
  },
];

// ─── Custom Stepper ───────────────────────────────────────────────────────────

function CampaignStepper({
  steps,
  currentStep,
}: {
  steps: string[];
  currentStep: number;
}) {
  return (
    <Box>
      {steps.map((label, i) => {
        const isActive = i === currentStep;
        const isCompleted = i < currentStep;
        const isLast = i === steps.length - 1;

        const circleBg = isActive || isCompleted ? '#11304F' : '#E6E8EB';
        const circleColor = isActive || isCompleted ? 'white' : '#6F7489';
        const labelColor = isActive ? '#11304F' : '#6F7489';

        return (
          <Box key={label}>
            <Flex align="center" gap="16px">
              <Flex
                align="center"
                justify="center"
                borderRadius="full"
                bg={circleBg}
                w="32px"
                h="32px"
                flexShrink={0}
              >
                <Text
                  fontSize="14px"
                  fontWeight="bold"
                  color={circleColor}
                  lineHeight="24px"
                >
                  {i + 1}
                </Text>
              </Flex>
              <Text
                fontSize="14px"
                fontWeight="medium"
                color={labelColor}
                whiteSpace="nowrap"
              >
                {label}
              </Text>
            </Flex>

            {!isLast && (
              <Box w="32px" h="18px" overflow="hidden">
                <Box ml="15px" w="1px" h="32px" bg="#DDDFE4" />
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
}

// ─── Toolbar helpers ──────────────────────────────────────────────────────────

function ToolbarBtn({ label, title }: { label: string; title: string }) {
  return (
    <Box
      as="button"
      title={title}
      px="6px"
      py="1px"
      borderRadius="2px"
      fontSize="13px"
      fontWeight="bold"
      color="#11304F"
      lineHeight="18px"
      _hover={{ bg: '#F4F6F8' }}
      cursor="pointer"
      bg="transparent"
      border="none"
    >
      {label}
    </Box>
  );
}

function ToolbarIcon({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Box
      as="button"
      title={title}
      p="3px"
      borderRadius="2px"
      color="#11304F"
      _hover={{ bg: '#F4F6F8' }}
      cursor="pointer"
      bg="transparent"
      border="none"
      display="flex"
      alignItems="center"
    >
      {children}
    </Box>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function NewCampaignPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [search, setSearch] = useState('');

  const filtered = MOCK_RECIPIENTS.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep((s) => s + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  return (
    <Flex h="100vh" overflow="hidden">
      {/* ── Left Sidebar Nav ── */}
      <Flex
        as="nav"
        direction="column"
        align="center"
        bg="#292158"
        w="74px"
        py={5}
        gap={4}
        flexShrink={0}
        overflowY="auto"
      >
        {NAV_ICONS.map(({ icon: NavIcon, label }) => (
          <IconButton
            key={label}
            icon={<NavIcon />}
            variant="action-dark"
            aria-label={label}
            size="md"
          />
        ))}
      </Flex>

      {/* ── Main Area ── */}
      <Flex direction="column" flex={1} overflow="hidden">

        {/* ── Header ── */}
        <Flex
          align="center"
          justify="space-between"
          px={6}
          h="64px"
          bg="white"
          borderBottom="1px solid"
          borderColor="#DDDFE4"
          flexShrink={0}
        >
          <HStack spacing={3}>
            <RouterLink to="/" style={{ textDecoration: 'none' }}>
              <IconButton
                icon={<ArrowBack />}
                variant="minimal"
                aria-label="Go back"
                size="sm"
                color="#11304F"
              />
            </RouterLink>
            <Text fontWeight="bold" fontSize="18px" color="#11304F">
              Create New Campaign
            </Text>
          </HStack>

          <HStack spacing={3}>
            {currentStep > 0 && (
              <Button
                label="Previous"
                variant="secondary"
                size="md"
                borderRadius="16px"
                minW="100px"
                onClick={handlePrev}
              />
            )}
            <Button
              label="Next"
              variant="primary"
              size="md"
              borderRadius="16px"
              bg="#48B5B5"
              _hover={{ bg: '#3DA3A3' }}
              color="white"
              minW="100px"
              onClick={handleNext}
              disabled={currentStep === STEPS.length - 1}
            />
          </HStack>
        </Flex>

        {/* ── Body: stepper sidebar + content ── */}
        <Flex flex={1} overflow="hidden">

          {/* Stepper sidebar */}
          <Box
            w="240px"
            flexShrink={0}
            bg="#F4F6F8"
            px={6}
            pt={6}
            borderRight="1px solid"
            borderColor="#DDDFE4"
            overflowY="auto"
          >
            <CampaignStepper steps={STEPS} currentStep={currentStep} />
          </Box>

          {/* Step content */}
          <Box flex={1} overflowY="auto" px={8} pt={8} bg="white">
            {currentStep === 0 && (
              <SelectRecipientsStep
                search={search}
                onSearch={setSearch}
                recipients={filtered}
              />
            )}
            {currentStep === 1 && <ComposeMessageStep />}
            {currentStep === 2 && <ScheduleStep />}
            {currentStep === 3 && (
              <StepPlaceholder title="Review & send" />
            )}
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}

// ─── Step 1: Select Recipients ────────────────────────────────────────────────

type SelectRecipientsStepProps = {
  search: string;
  onSearch: (v: string) => void;
  recipients: Recipient[];
};

function SelectRecipientsStep({
  search,
  onSearch,
  recipients,
}: SelectRecipientsStepProps) {
  return (
    <Box>
      <Text fontSize="20px" fontWeight="semibold" color="#11304F" mb={2}>
        Select the recipients for this message
      </Text>
      <Divider borderColor="#11304F" mb={6} />

      {/* Toolbar */}
      <Flex justify="space-between" align="center" mb={6}>
        <Box w="358px">
          <SearchInput
            placeholder="Search recipients"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onSearch(e.target.value)
            }
          />
        </Box>

        <HStack spacing={3}>
          <Button
            label="New"
            variant="secondary"
            icon={Users}
            iconPos="left"
            size="sm"
            borderRadius="8px"
          />
          <Button
            label="Import"
            variant="secondary"
            icon={ImportXlsx}
            iconPos="left"
            size="sm"
            borderRadius="8px"
          />
          <Button
            label="Download template"
            variant="secondary"
            icon={Download}
            iconPos="left"
            size="sm"
            borderRadius="8px"
          />

          {/* Stats card */}
          <Flex
            border="1px solid"
            borderColor="#DDDFE4"
            borderRadius="8px"
            overflow="hidden"
          >
            <HStack
              px={3}
              py={2}
              spacing={2}
              borderRight="1px solid"
              borderColor="#DDDFE4"
            >
              <Icon as={Plus} fontSize="14px" color="#11304F" />
              <Text fontSize="14px" color="#11304F" fontWeight="medium">
                {recipients.length}
              </Text>
            </HStack>
            <HStack px={3} py={2} spacing={2}>
              <Icon as={Users} fontSize="14px" color="#6F7489" />
              <Text fontSize="14px" color="#6F7489">
                {recipients.length}
              </Text>
            </HStack>
          </Flex>
        </HStack>
      </Flex>

      {/* Table */}
      <Table variant="simple" size="md">
        <Thead>
          <Tr borderBottom="1px solid" borderColor="#E6E8EB">
            {['Name', 'Email', 'Balance', 'Language'].map((col) => (
              <Th
                key={col}
                fontFamily="sans-serif"
                fontWeight="bold"
                color="#6F7489"
                fontSize="14px"
                textTransform="none"
                letterSpacing="normal"
                pl={col === 'Name' ? 0 : undefined}
              >
                {col}
              </Th>
            ))}
            <Th
              fontFamily="sans-serif"
              fontWeight="bold"
              color="#6F7489"
              fontSize="14px"
              textTransform="none"
              letterSpacing="normal"
            >
              <HStack spacing={1}>
                <Text>Mobile</Text>
                <Icon as={Info} fontSize="16px" color="#6F7489" />
              </HStack>
            </Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {recipients.map((r) => (
            <Tr
              key={r.id}
              borderBottom="1px solid"
              borderColor="#F4F6F8"
              _hover={{ bg: 'gray.50' }}
            >
              <Td pl={0} color="#11304F" fontSize="16px" fontWeight="bold">
                {r.name}
              </Td>
              <Td color="#11304F" fontSize="16px">{r.email}</Td>
              <Td color="#11304F" fontSize="16px">{r.balance}</Td>
              <Td color="#11304F" fontSize="16px">{r.language}</Td>
              <Td>
                {r.mobileWarning ? (
                  <HStack spacing={1}>
                    <Icon as={Attention} fontSize="16px" color="orange.400" />
                    <Text
                      fontSize="14px"
                      color="#48B5B5"
                      textDecoration="underline"
                      cursor="pointer"
                    >
                      Edit
                    </Text>
                  </HStack>
                ) : (
                  <Text fontSize="16px" color="#11304F">—</Text>
                )}
              </Td>
              <Td>
                <Menu
                  menuButton={
                    <IconButton
                      icon={<More />}
                      variant="minimal"
                      aria-label="More options"
                      size="sm"
                    />
                  }
                >
                  <MenuItem title="Edit" onSelect={() => {}} />
                  <MenuItem title="Remove" danger onSelect={() => {}} />
                </Menu>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

// ─── Step 2: Compose Message ──────────────────────────────────────────────────

const TEMPLATE_OPTIONS = [
  { label: 'Welcome email', value: 'welcome' },
  { label: 'Payment reminder', value: 'payment-reminder' },
  { label: 'Follow-up', value: 'follow-up' },
];

function ComposeMessageStep() {
  const [campaignName, setCampaignName] = useState('');
  const [subject, setSubject] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<{
    label: string;
    value: string;
  } | null>(null);

  return (
    <Box pb={8}>
      <Text fontSize="20px" fontWeight="semibold" color="#11304F" mb={2}>
        Compose your message
      </Text>
      <Divider borderColor="#11304F" mb={6} />

      {/* Campaign Name */}
      <Box mb={6}>
        <Text fontSize="16px" fontWeight="semibold" color="#11304F" mb={3}>
          Campaign Name
        </Text>
        <Input
          label="e.g. 30 days sequence with Text message"
          value={campaignName}
          onChange={(e) => setCampaignName(e.target.value)}
        />
        <Text fontSize="12px" color="#6F7489" mt={1}>
          For internal reference only. This won't be visible to your recipient(s).
        </Text>
      </Box>

      {/* Section title + info */}
      <Flex justify="space-between" align="flex-start" mb={4} gap={4}>
        <Text fontSize="16px" fontWeight="semibold" color="#11304F" flexShrink={0}>
          Compose your message
        </Text>
        <HStack spacing={1} align="flex-start">
          <Text fontSize="12px" color="#48B5B5" textAlign="right">
            Choose between a one-time Email or Text message or set a campaign
            using a Sequence with multiple steps.
          </Text>
          <Icon as={Info} fontSize="14px" color="#48B5B5" mt="1px" flexShrink={0} />
        </HStack>
      </Flex>

      {/* Template + Subject card */}
      <Box border="2px solid" borderColor="#E8A838" borderRadius="8px" p={4}>
        {/* Template row */}
        <Flex align="center" gap={3} mb={1}>
          <Box flex={1}>
            <DropdownSingle
              label="Select an email template"
              options={TEMPLATE_OPTIONS}
              selectedOption={selectedTemplate}
              onChangeValue={(val) => {
                setSelectedTemplate(
                  TEMPLATE_OPTIONS.find((o) => o.value === val) ?? null
                );
              }}
              showDownIcon
            />
          </Box>
          <Icon as={Info} fontSize="16px" color="#6F7489" />
          <Flex
            bg="#4A3F8F"
            borderRadius="4px"
            px={2}
            h="24px"
            align="center"
            justify="center"
          >
            <Text fontSize="11px" color="white" fontWeight="bold" lineHeight="1">
              EN
            </Text>
          </Flex>
        </Flex>
        <Text fontSize="12px" color="#6F7489" mb={4}>
          Optional
        </Text>

        <Divider borderColor="#DDDFE4" mb={4} />

        {/* Subject */}
        <HStack spacing={3}>
          <Text
            fontSize="14px"
            fontWeight="bold"
            color="#11304F"
            whiteSpace="nowrap"
          >
            *Subject:
          </Text>
          <CInput
            variant="flushed"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            borderColor="#DDDFE4"
            _focus={{ borderColor: '#48B5B5', boxShadow: 'none' }}
            fontSize="14px"
            color="#11304F"
            flex={1}
          />
        </HStack>
      </Box>

      {/* Dashed connector */}
      <Flex justify="center">
        <Box
          w="0"
          h="24px"
          borderLeft="2px dashed"
          borderColor="#E8A838"
        />
      </Flex>

      {/* Message composer card */}
      <Box border="2px solid" borderColor="#E8A838" borderRadius="8px" p={4}>
        {/* Insert tags */}
        <HStack spacing={2} mb={3}>
          <Text fontSize="14px" fontWeight="bold" color="#11304F">
            Insert tags:
          </Text>
          <Text fontSize="14px" color="#6F7489">
            Type "@" to add tags into your message.
          </Text>
          <Icon as={Info} fontSize="14px" color="#6F7489" />
        </HStack>

        {/* Tag chip area */}
        <Box bg="#DDE3EA" borderRadius="4px" h="36px" mb={4} />

        {/* Compose label */}
        <Text fontSize="14px" fontWeight="medium" color="#11304F" mb={2}>
          Compose your message:
        </Text>

        {/* Toolbar */}
        <Flex
          border="1px solid"
          borderColor="#DDDFE4"
          borderRadius="4px 4px 0 0"
          px={2}
          py="6px"
          gap={1}
          align="center"
          flexWrap="wrap"
        >
          {/* Font family */}
          <Select
            size="xs"
            w="80px"
            fontSize="12px"
            border="none"
            _focus={{ boxShadow: 'none' }}
            color="#11304F"
          >
            <option>Arial</option>
            <option>Times New Roman</option>
            <option>Georgia</option>
          </Select>

          {/* Font size */}
          <Select
            size="xs"
            w="58px"
            fontSize="12px"
            border="none"
            _focus={{ boxShadow: 'none' }}
            color="#11304F"
            defaultValue="11pt"
          >
            <option>8pt</option>
            <option>10pt</option>
            <option>11pt</option>
            <option>12pt</option>
            <option>14pt</option>
            <option>18pt</option>
          </Select>

          <Box w="1px" h="16px" bg="#DDDFE4" mx={1} />

          {/* B I U */}
          <ToolbarBtn label="B" title="Bold" />
          <ToolbarBtn label="I" title="Italic" />
          <ToolbarBtn label="U" title="Underline" />

          {/* Text color */}
          <Box
            as="button"
            title="Text Color"
            px="6px"
            py="1px"
            borderRadius="2px"
            fontSize="13px"
            fontWeight="bold"
            color="#11304F"
            lineHeight="18px"
            _hover={{ bg: '#F4F6F8' }}
            cursor="pointer"
            bg="transparent"
            border="none"
            position="relative"
          >
            <Text as="span" borderBottom="2px solid" borderColor="red.500">
              A
            </Text>
            <Text as="span" fontSize="10px" ml="1px">▾</Text>
          </Box>

          <Box w="1px" h="16px" bg="#DDDFE4" mx={1} />

          {/* Ordered list */}
          <ToolbarIcon title="Ordered List">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2 3h1v3H2V3zm0 4.5h1v1H2v-1zm0 3h1v1H2v-1zM1 12.5h1.5V13H1v.5h1.5V14H1v.5h1.5v-2H1v.5zM1 11h.5v.5H1V12h1V10H1v1zm1-6.5H1.5V5H1v.5h.5V6H2V5h.5v-.5H2V4.5zM5 4h9v1H5V4zm0 4h9v1H5V8zm0 4h9v1H5v-1z"/>
            </svg>
          </ToolbarIcon>

          {/* Unordered list */}
          <ToolbarIcon title="Unordered List">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <circle cx="3" cy="4.5" r="1"/>
              <circle cx="3" cy="8.5" r="1"/>
              <circle cx="3" cy="12.5" r="1"/>
              <path d="M6 4h9v1H6V4zm0 4h9v1H6V8zm0 4h9v1H6v-1z"/>
            </svg>
          </ToolbarIcon>

          <Box w="1px" h="16px" bg="#DDDFE4" mx={1} />

          {/* Align left */}
          <ToolbarIcon title="Align Left">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2 4h12v1H2V4zm0 3h8v1H2V7zm0 3h12v1H2v-1zm0 3h8v1H2v-1z"/>
            </svg>
          </ToolbarIcon>

          {/* Align center */}
          <ToolbarIcon title="Align Center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2 4h12v1H2V4zm2 3h8v1H4V7zm-2 3h12v1H2v-1zm2 3h8v1H4v-1z"/>
            </svg>
          </ToolbarIcon>

          {/* Align right */}
          <ToolbarIcon title="Align Right">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2 4h12v1H2V4zm4 3h8v1H6V7zm-4 3h12v1H2v-1zm4 3h8v1H6v-1z"/>
            </svg>
          </ToolbarIcon>

          <Box w="1px" h="16px" bg="#DDDFE4" mx={1} />

          {/* Insert image */}
          <ToolbarIcon title="Insert Image">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
              <rect x="2" y="3" width="12" height="10" rx="1"/>
              <circle cx="5.5" cy="6.5" r="1"/>
              <path d="M2 11l3.5-3.5 2.5 2.5 2-2L14 11"/>
            </svg>
          </ToolbarIcon>

          {/* Insert link */}
          <ToolbarIcon title="Insert Link">
            <Icon as={LinkIcon} fontSize="15px" />
          </ToolbarIcon>

          <Box w="1px" h="16px" bg="#DDDFE4" mx={1} />

          {/* Desktop preview */}
          <ToolbarIcon title="Desktop Preview">
            <Icon as={Devices} fontSize="16px" />
          </ToolbarIcon>

          {/* Mobile preview */}
          <ToolbarIcon title="Mobile Preview">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
              <rect x="4.5" y="1.5" width="7" height="13" rx="1.5"/>
              <circle cx="8" cy="12.5" r="0.6" fill="currentColor" stroke="none"/>
            </svg>
          </ToolbarIcon>
        </Flex>

        {/* Editor content area */}
        <Box
          as="div"
          contentEditable
          suppressContentEditableWarning
          border="1px solid"
          borderTop="none"
          borderColor="#DDDFE4"
          borderRadius="0 0 4px 4px"
          minH="200px"
          p={3}
          fontSize="14px"
          color="#11304F"
          sx={{
            '&:focus': { outline: 'none' },
            '&:empty:before': {
              content: '"Start typing your message..."',
              color: '#9AA0B4',
            },
          }}
        />
      </Box>
    </Box>
  );
}

// ─── Step 3: Schedule ────────────────────────────────────────────────────────

const TIMEZONE_OPTIONS = [
  { label: '(GMT-12:00) International Date Line West', value: 'UTC-12' },
  { label: '(GMT-10:00) Hawaii', value: 'UTC-10' },
  { label: '(GMT-08:00) Pacific Time (US & Canada)', value: 'UTC-8' },
  { label: '(GMT-07:00) Mountain Time (US & Canada)', value: 'UTC-7' },
  { label: '(GMT-06:00) Central Time (US & Canada)', value: 'UTC-6' },
  { label: '(GMT-05:00) Eastern Time (US & Canada)', value: 'UTC-5' },
  { label: '(GMT+00:00) UTC', value: 'UTC' },
  { label: '(GMT+01:00) Amsterdam, Berlin, Rome', value: 'UTC+1' },
  { label: '(GMT+05:30) Chennai, Kolkata, Mumbai', value: 'UTC+5:30' },
];

type ScheduleDateRowProps = {
  date: Date;
  onDateChange: (d: Date) => void;
  hour: string;
  minute: string;
  ampm: 'AM' | 'PM';
  onHourChange: (h: string) => void;
  onMinuteChange: (m: string) => void;
  onAmPmChange: (v: 'AM' | 'PM') => void;
  summaryLabel: string;
  namePrefix: string;
};

function ScheduleDateRow({
  date,
  onDateChange,
  hour,
  minute,
  ampm,
  onHourChange,
  onMinuteChange,
  onAmPmChange,
  summaryLabel,
  namePrefix,
}: ScheduleDateRowProps) {
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const increment = () => {
    let h = parseInt(hour, 10);
    let m = parseInt(minute, 10) + 1;
    if (m >= 60) { m = 0; h += 1; }
    if (h > 12) h = 1;
    onHourChange(h.toString().padStart(2, '0'));
    onMinuteChange(m.toString().padStart(2, '0'));
  };

  const decrement = () => {
    let h = parseInt(hour, 10);
    let m = parseInt(minute, 10) - 1;
    if (m < 0) { m = 59; h -= 1; }
    if (h < 1) h = 12;
    onHourChange(h.toString().padStart(2, '0'));
    onMinuteChange(m.toString().padStart(2, '0'));
  };

  return (
    <Flex
      bg="#EFF4F8"
      borderRadius="8px"
      px={4}
      py={3}
      align="center"
      gap={4}
      flexWrap="wrap"
    >
      {/* Date picker */}
      <Box minW="130px">
        <DatePicker
          id={`${namePrefix}-date`}
          selected={date}
          onChange={(d: Date) => d && onDateChange(d)}
          dateFormat="MMM. dd, yyyy"
        />
      </Box>

      <Text fontSize="13px" color="#6F7489" whiteSpace="nowrap">
        starting at
      </Text>

      {/* Time input with spinners */}
      <Flex
        border="1px solid"
        borderColor="#DDDFE4"
        borderRadius="6px"
        bg="white"
        align="center"
        overflow="hidden"
        h="32px"
      >
        <CInput
          w="28px"
          textAlign="center"
          fontSize="13px"
          border="none"
          px={1}
          h="100%"
          value={hour}
          onChange={(e) =>
            onHourChange(e.target.value.replace(/\D/g, '').slice(0, 2))
          }
          _focus={{ boxShadow: 'none' }}
        />
        <Text fontSize="13px" color="#11304F" userSelect="none">
          :
        </Text>
        <CInput
          w="28px"
          textAlign="center"
          fontSize="13px"
          border="none"
          px={1}
          h="100%"
          value={minute}
          onChange={(e) =>
            onMinuteChange(e.target.value.replace(/\D/g, '').slice(0, 2))
          }
          _focus={{ boxShadow: 'none' }}
        />
        <Flex
          direction="column"
          borderLeft="1px solid"
          borderColor="#DDDFE4"
          h="100%"
        >
          <Box
            as="button"
            flex={1}
            px="4px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            _hover={{ bg: '#F4F6F8' }}
            onClick={increment}
            borderBottom="1px solid"
            borderColor="#DDDFE4"
            type="button"
          >
            <Icon as={ChevronUp} fontSize="9px" color="#6F7489" />
          </Box>
          <Box
            as="button"
            flex={1}
            px="4px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            _hover={{ bg: '#F4F6F8' }}
            onClick={decrement}
            type="button"
          >
            <Icon as={ChevronDown} fontSize="9px" color="#6F7489" />
          </Box>
        </Flex>
      </Flex>

      {/* AM / PM radio */}
      <VStack spacing={0} align="flex-start">
        <Radio
          id={`${namePrefix}-am`}
          name={`${namePrefix}-ampm`}
          value="AM"
          isChecked={ampm === 'AM'}
          onChange={() => onAmPmChange('AM')}
          size="sm"
        >
          <Text fontSize="12px" color="#11304F">AM</Text>
        </Radio>
        <Radio
          id={`${namePrefix}-pm`}
          name={`${namePrefix}-ampm`}
          value="PM"
          isChecked={ampm === 'PM'}
          onChange={() => onAmPmChange('PM')}
          size="sm"
        >
          <Text fontSize="12px" color="#11304F">PM</Text>
        </Radio>
      </VStack>

      {/* Info */}
      <Icon as={Info} fontSize="18px" color="red.500" />

      {/* Summary */}
      <Text fontSize="13px" fontWeight="medium" color="#11304F" flex={1}>
        {summaryLabel} : {formattedDate} - {hour}:{minute} {ampm}
      </Text>
    </Flex>
  );
}

function ScheduleStep() {
  const defaultTimezone =
    TIMEZONE_OPTIONS.find((o) => o.value === 'UTC-5') ?? TIMEZONE_OPTIONS[0];

  const [timezone, setTimezone] = useState(defaultTimezone);
  const [allowDebtors, setAllowDebtors] = useState(false);

  const [sendDate, setSendDate] = useState<Date>(new Date('2026-04-14'));
  const [sendHour, setSendHour] = useState('06');
  const [sendMinute, setSendMinute] = useState('35');
  const [sendAmPm, setSendAmPm] = useState<'AM' | 'PM'>('PM');

  const [closeDate, setCloseDate] = useState<Date>(new Date('2026-05-24'));
  const [closeHour, setCloseHour] = useState('06');
  const [closeMinute, setCloseMinute] = useState('35');
  const [closeAmPm, setCloseAmPm] = useState<'AM' | 'PM'>('PM');

  return (
    <Box pb={8}>
      <Text fontSize="20px" fontWeight="semibold" color="#11304F" mb={2}>
        Schedule
      </Text>
      <Divider borderColor="#11304F" mb={6} />

      {/* Campaign summary + timezone */}
      <Flex justify="space-between" align="flex-start" mb={6} gap={4}>
        <Box>
          <Text fontSize="16px" fontWeight="bold" color="#48B5B5" mb={3}>
            New Campaign
          </Text>
          <HStack spacing={3}>
            {/* Email card */}
            <Flex
              border="1px dashed"
              borderColor="#DDDFE4"
              borderRadius="6px"
              px={3}
              py={2}
              gap={2}
              align="center"
              minW="140px"
            >
              <Icon as={Email} fontSize="18px" color="#6F7489" />
              <Box>
                <Text fontSize="13px" fontWeight="bold" color="#11304F">
                  Email
                </Text>
                <Text fontSize="11px" color="#6F7489">
                  Single Message
                </Text>
              </Box>
            </Flex>

            {/* Recipients card */}
            <Flex
              border="1px dashed"
              borderColor="#DDDFE4"
              borderRadius="6px"
              px={3}
              py={2}
              gap={2}
              align="center"
              minW="110px"
            >
              <Icon as={Users} fontSize="18px" color="#6F7489" />
              <Box>
                <Text fontSize="13px" fontWeight="bold" color="#11304F">
                  Recipients
                </Text>
                <Text fontSize="11px" color="#6F7489">
                  1
                </Text>
              </Box>
            </Flex>
          </HStack>
        </Box>

        {/* Timezone selector */}
        <Box w="300px" flexShrink={0}>
          <Text fontSize="12px" color="#6F7489" mb={1}>
            Time Zone (Default)
          </Text>
          <DropdownSingle
            options={TIMEZONE_OPTIONS}
            selectedOption={timezone}
            onChangeValue={(val) =>
              setTimezone(
                TIMEZONE_OPTIONS.find((o) => o.value === val) ?? timezone
              )
            }
            showDownIcon
          />
        </Box>
      </Flex>

      {/* Section title */}
      <Flex align="center" gap={3} mb={2} flexWrap="wrap">
        <Text fontSize="18px" fontWeight="semibold" color="#11304F">
          Set your send options
        </Text>
        <Text fontSize="13px" color="#48B5B5">
          Define the send details and choose a time to activate your campaign
        </Text>
      </Flex>
      <Divider borderColor="#DDDFE4" mb={5} />

      {/* Checkbox */}
      <Box mb={6}>
        <Checkbox
          id="allow-debtors"
          name="allow-debtors"
          isChecked={allowDebtors}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAllowDebtors(e.target.checked)
          }
        >
          <Text fontSize="14px" color="#11304F">
            Allow debtors to set payment arrangement start date
          </Text>
        </Checkbox>
      </Box>

      {/* Send date */}
      <Box mb={5}>
        <HStack spacing={2} mb={2}>
          <Icon as={SetTime} fontSize="16px" color="#11304F" />
          <Text fontSize="14px" fontWeight="semibold" color="#11304F">
            Schedule a send date
          </Text>
        </HStack>
        <ScheduleDateRow
          date={sendDate}
          onDateChange={setSendDate}
          hour={sendHour}
          minute={sendMinute}
          ampm={sendAmPm}
          onHourChange={setSendHour}
          onMinuteChange={setSendMinute}
          onAmPmChange={setSendAmPm}
          summaryLabel="Campaign will start"
          namePrefix="send"
        />
      </Box>

      {/* Close date */}
      <Box>
        <HStack spacing={2} mb={2}>
          <Icon as={SetTime} fontSize="16px" color="#11304F" />
          <Text fontSize="14px" fontWeight="semibold" color="#11304F">
            Schedule a close date
          </Text>
          <Icon as={Info} fontSize="14px" color="#6F7489" />
        </HStack>
        <ScheduleDateRow
          date={closeDate}
          onDateChange={setCloseDate}
          hour={closeHour}
          minute={closeMinute}
          ampm={closeAmPm}
          onHourChange={setCloseHour}
          onMinuteChange={setCloseMinute}
          onAmPmChange={setCloseAmPm}
          summaryLabel="Campaign will close"
          namePrefix="close"
        />
        <Text fontSize="11px" color="#6F7489" mt={2}>
          It will no longer be possible to access the links in the emails sent
          after the date shown here.
        </Text>
      </Box>
    </Box>
  );
}

// ─── Placeholder for other steps ─────────────────────────────────────────────

function StepPlaceholder({ title }: { title: string }) {
  return (
    <Box>
      <Text fontSize="20px" fontWeight="semibold" color="#11304F" mb={2}>
        {title}
      </Text>
      <Divider borderColor="#11304F" mb={6} />
      <Text color="#6F7489" fontSize="16px">
        This step is coming soon.
      </Text>
    </Box>
  );
}

export default NewCampaignPage;
